import { http } from "@/utils";
import { ResType } from './shared'

export type DetailRes = {
  art_id: string,
  title: string,
  pubdate: string,
  content: string
}

export function fetchDetailAPI(article_id: string) {
  return http.request<ResType<DetailRes>>({
    url: `/articles/${article_id}`
  })
}