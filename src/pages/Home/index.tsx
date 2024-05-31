import './style.css'
import { Tabs } from 'antd-mobile'
import { useTabs } from './useTabs'
import HomeList from './HomeList'

const Home = () => {
  const { channels } = useTabs()
  return (
    <Tabs defaultActiveKey={'0'}>
      {channels.map((item) => (
        <Tabs.Tab title={item.name} key={item.id}>
          <div className="listContainer">
            <HomeList channelId={item.id} />
          </div>
        </Tabs.Tab>
      ))}
    </Tabs>
  )
}

export default Home