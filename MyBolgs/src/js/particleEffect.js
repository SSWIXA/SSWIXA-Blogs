// ============ 粒子特效：轻量彩虹荧光 — 点击爆炸 + 鼠标拖尾 ============
(function () {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const particles = []

  let width, height
  let mouseX = -100, mouseY = -100
  let lastTrailX = -100, lastTrailY = -100
  let animating = false
  let hueOffset = 0

  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:99999'
  document.body.appendChild(canvas)

  function resize() {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  function rainbowColor(hue) {
    return `hsl(${hue % 360}, 100%, 65%)`
  }

  // ---------- 爆炸（粒子减半）----------
  function burst(x, y) {
    const count = 12 + Math.floor(Math.random() * 8) // 10~17 个
    const baseHue = Math.random() * 360
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6
      const speed = 2 + Math.random() * 4
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.2,
        decay: 0.018 + Math.random() * 0.025,
        size: 2 + Math.random() * 3,
        hue: baseHue + i * (360 / count),
        gravity: 0.02,
      })
    }
  }

  // ---------- 拖尾 ----------
  function trail(x, y) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      life: 1.5,
      decay: 0.035 + Math.random() * 0.04,
      size: 1.2 + Math.random() * 1.8,
      hue: hueOffset,
      gravity: 0,
    })
  }

  document.addEventListener('click', (e) => {
    burst(e.clientX, e.clientY)
    if (!animating) { animating = true; loop() }
  })

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    const dx = mouseX - lastTrailX
    const dy = mouseY - lastTrailY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const stepCount = Math.floor(dist / 12) // 每12px一个（降低密度）
    if (stepCount > 0) {
      for (let i = 1; i <= stepCount; i++) {
        const t = i / stepCount
        trail(lastTrailX + dx * t, lastTrailY + dy * t)
      }
      lastTrailX = mouseX
      lastTrailY = mouseY
    }
    if (!animating && particles.length > 0) { animating = true; loop() }
  })

  // ---------- 渲染（单层光晕，无 shadowBlur）----------
  function loop() {
    ctx.clearRect(0, 0, width, height)
    hueOffset = (hueOffset + 0.5) % 360

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += p.gravity
      p.life -= p.decay
      p.vx *= 0.99
      p.vy *= 0.99

      if (p.type !== 'burst') p.hue = hueOffset

      if (p.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      const alpha = p.life
      const color = rainbowColor(Math.floor(p.hue))
      const size = p.size * p.life

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'

      // 外层柔光
      ctx.globalAlpha = alpha * 0.35
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
      ctx.fill()

      // 核心亮点
      ctx.globalAlpha = alpha
      const brightColor = `hsl(${Math.floor(p.hue)}, 100%, 80%)`
      ctx.fillStyle = brightColor
      ctx.beginPath()
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    if (particles.length > 0) {
      requestAnimationFrame(loop)
    } else {
      animating = false
      lastTrailX = mouseX
      lastTrailY = mouseY
    }
  }
})()
