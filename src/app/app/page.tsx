export default function AppDownloadPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Newtrain 学习APP</h1>
          <p className="text-indigo-100 mt-2">扫码下载或在浏览器打开下载地址</p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img alt="APP下载二维码" className="w-40 h-40 rounded-lg shadow" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fnewtrain.app%2Fdownload" />
          </div>
          <div>
            <div className="text-lg text-gray-700 mb-4">如果无法扫码，请打开：</div>
            <a className="text-blue-600 hover:underline" href="https://newtrain.app/download" target="_blank">https://newtrain.app/download</a>
            <p className="text-sm text-gray-500 mt-2">上线后将替换为正式应用商店地址</p>
          </div>
        </div>
      </section>
    </div>
  )
}
