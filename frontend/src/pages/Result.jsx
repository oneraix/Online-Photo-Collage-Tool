import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCollageInfo } from '../api'

export default function Result() {
  const { taskId } = useParams()
  const [collageUrl, setCollageUrl] = useState(null)
  const [borderColor, setBorderColor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getCollageInfo(taskId) 
        if (data.url) {
          setCollageUrl(data.url)

          setBorderColor(data.border_color) 
        }
      } catch (err) {
        console.error("Lấy URL thất bại", err)
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [taskId])

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
        <h2 className="text-xl font-semibold text-green-600 mb-4">🎉 Ảnh ghép đã sẵn sàng!</h2>
        <p className="text-gray-700 mb-4">
          ✅ Tạo ảnh thành công{borderColor ? ` và có viền màu ${borderColor}` : ""}.
        </p>
        <img
          src={collageUrl}
          alt="Kết quả ảnh ghép"
          className="max-w-full rounded mb-4 shadow border"
        />
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <a
            href={collageUrl}
            download="collage.jpg"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 font-semibold"
          >
            📥 Tải ảnh
          </a>
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 font-medium"
          >
            ← Trở về trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}
