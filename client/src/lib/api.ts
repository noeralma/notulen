const API_URL = import.meta.env.VITE_API_URL || "/api";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const api = {
  get: async <T>(endpoint: string, options?: FetchOptions): Promise<T> => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!res.ok) {
        // Try to parse error message from JSON response
        try {
          const errorData = await res.json();
          throw new Error(errorData.message || `API Error: ${res.statusText}`);
        } catch (jsonError) {
          // If JSON parsing fails or it was the jsonError itself
          if (jsonError instanceof Error && jsonError.message.startsWith("API Error")) {
            throw jsonError;
          }
           throw new Error(`API Error: ${res.statusText}`);
        }
      }

      return res.json();
    } catch (error) {
       console.error("API GET Error:", error);
       throw error;
    }
  },

  post: async <T>(endpoint: string, body: unknown, options?: FetchOptions): Promise<T> => {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
         try {
          const errorData = await res.json();
          throw new Error(errorData.message || `API Error: ${res.statusText}`);
        } catch (jsonError) {
           if (jsonError instanceof Error && jsonError.message.startsWith("API Error")) {
            throw jsonError;
          }
           throw new Error(`API Error: ${res.statusText}`);
        }
      }

      return res.json();
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  },
};
