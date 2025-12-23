export const metadata = {
  title: '关于我们 - Newtrain 外贸培训平台',
  description: '19年外贸实战经验打造的培训平台，定位外贸布道者，提供新人、大学生、老板转型的体系化课程',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Newtrain（新训）——外贸布道者的数字化平台，以19年实战经验为底座，提供“体系化流程落地 + 高阶思维重塑”训练。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">我们的使命</h2>
            <p className="text-gray-700 leading-relaxed">
              让外贸学习更高效、更可落地。我们将新人、大学生、老板三类人群的学习路径拆解为30天训练体系，既保留“硬核细节”，又强化“认知破局”。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">创始人与团队</h3>
            <p className="text-gray-700 leading-relaxed">
              创始人拥有19年外贸从业经历，从小员工、小组长、外贸负责人到创业公司老板，全面覆盖外贸流程与团队管理，擅长方向把握与细节指导。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">课程与资料</h3>
            <p className="text-gray-700 leading-relaxed">
              平台提供视频与文字资料，覆盖政策适配、合规操作、高潜力赛道等前沿内容，并持续上线AI重塑外贸新打法与n8n自动化工作流模板。
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">合作与内训</h3>
            <p className="text-gray-700 leading-relaxed">
              为企业提供外贸转型咨询与内训方案，包含团队搭建、渠道布局、风控与合规等主题，欢迎联系定制化服务。
            </p>
          </div>

          <aside className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">联系方式</h3>
            <ul className="space-y-2 text-gray-700">
              <li>邮箱：contact@newtraining.cn</li>
              <li>地址：深圳市南山区科技园</li>
              <li>工作时间：周一至周五 9:00-18:00</li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">下载学习APP</h4>
              <img alt="APP下载二维码" className="w-40 h-40 rounded-lg shadow" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnewtrain.app%2Fdownload" />
              <a className="block mt-2 text-blue-600 hover:underline" href="https://newtrain.app/download" target="_blank">https://newtrain.app/download</a>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              免责声明：课程内容为教育与参考用途，实际业务需结合企业自身情况与合规要求执行。
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
