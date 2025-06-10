import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Result() {
  const { taskId } = useParams()
  const [collageUrl, setCollageUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetch(`http://16.176.17.132:5000/api/get-collage?id=${taskId}`)
        const data = await res.json()
        if (data.url) {
          setCollageUrl(data.url)
        }
      } catch (err) {
        console.error("Failed to fetch collage URL", err)
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [taskId])

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = collageUrl;
  link.download = 'collage.jpg'; // Trình duyệt vẫn cần Content-Disposition từ S3 để hoạt động đúng
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Đang tải kết quả ảnh ghép...</p>
      </div>
    )
  }

  if (!collageUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Không tìm thấy ảnh ghép.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🎉 Ảnh ghép đã sẵn sàng!</h2>
        <img
          src={collageUrl}
          alt="Kết quả ảnh ghép"
          className="max-w-full rounded mb-4 shadow border"
        />
        <button
          onClick={handleDownload}
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 font-semibold"
        >
          ⬇️ Download
        </button>
      </div>
    </div>
  )
}
