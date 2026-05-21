/**
 * 統一 API 響應格式工具
 */
class ApiResponse {
  /**
   * 成功響應
   * @param {*} data - 返回的數據
   * @param {string} message - 成功消息
   * @param {number} statusCode - HTTP 狀態碼
   */
  static success(data = null, message = '操作成功', statusCode = 200) {
    return {
      code: statusCode,
      success: true,
      message,
      data
    };
  }

  /**
   * 錯誤響應
   * @param {string} message - 錯誤消息
   * @param {number} statusCode - HTTP 狀態碼
   * @param {*} errors - 詳細錯誤信息
   */
  static error(message = '操作失敗', statusCode = 400, errors = null) {
    return {
      code: statusCode,
      success: false,
      message,
      errors
    };
  }

  /**
   * 分頁響應
   * @param {Array} items - 數據列表
   * @param {Object} pagination - 分頁信息
   * @param {string} message - 成功消息
   */
  static paginate(items, pagination, message = '獲取成功') {
    return {
      code: 200,
      success: true,
      message,
      data: {
        items,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: pagination.total,
          pages: pagination.pages
        }
      }
    };
  }

  /**
   * 創建成功響應
   * @param {*} data - 創建的數據
   * @param {string} message - 成功消息
   */
  static created(data = null, message = '創建成功') {
    return this.success(data, message, 201);
  }

  /**
   * 刪除成功響應
   * @param {string} message - 成功消息
   */
  static deleted(message = '刪除成功') {
    return this.success(null, message, 200);
  }

  /**
   * 更新成功響應
   * @param {*} data - 更新的數據
   * @param {string} message - 成功消息
   */
  static updated(data = null, message = '更新成功') {
    return this.success(data, message, 200);
  }

  /**
   * 未找到響應
   * @param {string} message - 錯誤消息
   */
  static notFound(message = '資源不存在') {
    return this.error(message, 404);
  }

  /**
   * 未授權響應
   * @param {string} message - 錯誤消息
   */
  static unauthorized(message = '未授權訪問') {
    return this.error(message, 401);
  }

  /**
   * 禁止訪問響應
   * @param {string} message - 錯誤消息
   */
  static forbidden(message = '禁止訪問') {
    return this.error(message, 403);
  }

  /**
   * 驗證錯誤響應
   * @param {string} message - 錯誤消息
   * @param {*} errors - 詳細錯誤信息
   */
  static validationError(message = '參數驗證失敗', errors = null) {
    return this.error(message, 422, errors);
  }
}

export default ApiResponse;
