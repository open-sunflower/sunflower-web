import Feed from '@/component/feed'
import ShortForm from '@/component/short-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/component/ui/tabs'

export default function Home() {
  return (
    <section className="mb-16 w-full sm:w-11/12 lg:w-1/2 mx-auto">
      <Tabs defaultValue="timeline" className="sm:hidden flex flex-col items-center pt-6">
        <TabsList>
          <TabsTrigger value="timeline">时间线</TabsTrigger>
          <TabsTrigger value="follow">关注</TabsTrigger>
          <TabsTrigger value="hot">热门</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full divide-y" value="timeline">
          <ShortForm />
          <Feed />
        </TabsContent>
        <TabsContent className="w-full" value="follow">
          <Feed />
        </TabsContent>
        <TabsContent className="w-full" value="hot">
          <Feed />
        </TabsContent>
      </Tabs>
      <div className="hidden sm:block divide-y">
        <ShortForm />
        <Feed />
      </div>
    </section>
  )
}
