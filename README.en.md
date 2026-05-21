# sswixa-blogs

A full-stack personal tech blog with Vue 3 + Express + MongoDB.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Vue 3 + TypeScript + Vite | Composition API |
| UI | Element Plus | Component library |
| Router | Vue Router 4 | Hash mode |
| State | Pinia | Lightweight store |
| HTTP | Axios | Request/response interceptors |
| Carousel | Swiper | Parallax effect |
| Code Highlight | Monaco Editor | VS Code editor |
| Backend | Express 5 | Node.js web framework |
| Database | MongoDB + Mongoose | Document database |
| Upload | Multer | Local file storage |

## Features

### Frontend
- **Home**: Full-screen parallax carousel + article list + profile sidebar
- **Article Detail**: 7 content block types (paragraph/heading/code/image/quote/list/divider)
- **Code Highlight**: Monaco Editor with 20+ language support
- **Sidebar**: Dynamic category tree navigation
- **Category Filter**: Browse articles by category
- **Search**: Full-text fuzzy search by title
- **Dark Mode**: System-wide dark/light theme toggle
- **Sakura + Live2D**: Cherry blossom canvas effect + virtual character

### Admin
- **Article List**: Paginated table (10 per page)
- **CRUD**: Create, read, update, delete articles
- **Content Block Editor**: Visual editor with 7 block types
- **Image Upload**: Local upload with preview (5MB limit, jpg/png/gif/webp)
- **Batch Actions**: Delete with confirmation dialog

### API
- **Versioned**: `/api/v1/` prefix
- **Unified Response**: `{ code, success, message, data }`
- See [API.md](API.md) for full documentation

## Project Structure

```
sswixa-blogs/
├── MyBolgs/                    # Frontend (Vue 3 + Vite)
│   └── src/
│       ├── api/                 # API service layer
│       ├── axios/               # Axios config
│       ├── components/          # Shared components
│       ├── router/              # Route config
│       ├── store/               # Pinia store
│       └── views/               # Page components
├── MyBolgsBackEnd/             # Backend (Express + Mongoose)
│   └── src/
│       ├── config/              # DB connection
│       ├── controllers/         # Request handlers
│       ├── middlewares/         # Error/404 handlers
│       ├── models/              # Mongoose schemas
│       ├── routes/              # API routes + versioning
│       ├── utils/               # Helpers (ApiResponse)
│       └── seed.js              # 18 sample articles
├── API.md                       # API documentation
├── start.bat                    # Windows quick start
└── start.sh                     # Linux/macOS quick start
```

## Quick Start

### Prerequisites

- Node.js >= 18
- MongoDB >= 4.0

### One-click (Windows)

```
start.bat
```

### Manual

**1. Start MongoDB**

```bash
mongod --dbpath="D:\Software\mongodb\data\db"
```

**2. Backend**

```bash
cd MyBolgsBackEnd
cnpm install
node src/seed.js          # Import 18 sample articles
npm start                  # http://localhost:5000
```

**3. Frontend**

```bash
cd MyBolgs
cnpm install
npm run dev                # http://localhost:5173
```

### URLs

| Service | URL |
|---------|-----|
| Home | http://localhost:5173 |
| Admin | http://localhost:5173/#/admin |
| API | http://localhost:5000/api/v1 |
| Health | http://localhost:5000/health |

## Data Model

```javascript
Post {
  title:         String,
  summary:       String,
  contentBlocks: [{
    type:        String,   // paragraph | heading | code | image | quote | list | divider
    data:        String,
    level:       Number,   // heading level 1-6
    language:    String,   // code language
    url:         String,   // image URL
    alt:         String,
    caption:     String,
    author:      String,
    style:       String,   // ordered | unordered
    items:       [String]
  }],
  views:         Number,
  likes:         Number,
  dislikes:      Number,
  tags:          [String],
  author:        String,
  category:      String,
  createdAt:     Date,
  updatedAt:     Date
}
```

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/xxx`
3. Commit changes: `git commit -m "description"`
4. Push: `git push origin feature/xxx`
5. Open a Pull Request

## License

MIT
