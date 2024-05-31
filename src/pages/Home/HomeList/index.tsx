import { Image, List, InfiniteScroll } from 'antd-mobile'
// mock数据
import { users } from './users'
import { useEffect, useState } from 'react'
import { ListRes, fetchListAPI } from '@/apis/list'
import { useNavigate } from 'react-router-dom'

type Props = {
  channelId: string
}

const HomeList = (props: Props) => {
  const { channelId } = props
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: '' + new Date().getTime()
  })
  useEffect(() => {
    async function getList() {
      try {
        const res = await fetchListAPI({
          channel_id: channelId,
          timestamp: '' + new Date().getTime()
        })
        setListRes(res.data.data)
      } catch (error) {
        throw new Error('fetch list error')
      }
    }
    getList()
  }, [channelId])

  //加载更多
  const [hasMore, setHadMore] = useState(true)
  const loadMore = async () => {
    try {
      const res = await fetchListAPI({
        channel_id: channelId,
        timestamp: listRes.pre_timestamp
      })
      //没有数据立刻停止
      if (res.data.data.results.length === 0) {
        setHadMore(false)
      }
      setListRes({
        //拼接新老数据
        results: [...listRes.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp
      })
    } catch (error) {
      throw new Error('load list error')
    }
  }

  //路由跳转传参
  const navigate = useNavigate()
  const goToDetail = (id: string) => {
    navigate(`/detail?id=${id}`)
  }

  return (
    <>
      <List>
        {listRes.results.map((item) => (
          <List.Item
            onClick={() => goToDetail(item.art_id)}
            key={item.art_id}
            prefix={
              <Image
                src={item.cover.images?.[0]}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
          >
            {item.title}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}

export default HomeList