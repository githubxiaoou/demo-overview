import { API_CONFIG } from "../config";
import type { Project } from "../config";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiService {
  private static baseUrl = API_CONFIG.API_BASE_URL;

  static async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_CONFIG.API_PROJECTS_ENDPOINT}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // 如果API返回的是包装格式，提取data字段
      if (data.data) {
        return data.data;
      }

      // 如果直接返回数组
      if (Array.isArray(data)) {
        return data;
      }

      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw error;
    }
  }

  static async getProjectById(id: string): Promise<Project | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}${API_CONFIG.API_PROJECTS_ENDPOINT}/${id}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data) {
        return data.data;
      }

      return data;
    } catch (error) {
      console.error(`Failed to fetch project ${id}:`, error);
      throw error;
    }
  }
}
