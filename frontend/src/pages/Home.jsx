import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTask } from "../api"

export default function Home() {
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [mode, setMode] = useState("horizontal")
  const [borderSize, setBorderSize] = useState(12)
  const [borderColor, setBorderColor] = useState("#ffffff")
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const newImages = [...images, ...files]
    const newPreviews = [
      ...previews,
      ...files.map(file => URL.createObjectURL(file))
    ]
    setImages(newImages)
    setPreviews(newPreviews)
  }

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setImages(newImages)
    setPreviews(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (images.length === 0) {
      alert("📷 Hãy chọn ít nhất một ảnh.")
      return
    }

    if (borderSize === "" || isNaN(borderSize)) {
      alert("📏 Vui lòng nhập kích cỡ viền.")
      return
    }

    const border = parseInt(borderSize)
    if (border < 0 || border > 1000) {
      alert("📏 Kích cỡ viền phải nằm trong khoảng từ 0 đến 1000.")
      return
    }

    const formData = new FormData()
    images.forEach(img => formData.append("images", img))
    formData.append("mode", mode)
    formData.append("border_size", border)
    formData.append("border_color", borderColor)

    try {
      const taskId = await createTask(formData)
      navigate(`/processing/${taskId}`)
    } catch (err) {
      console.error("Lỗi tạo task:", err)
      alert("❌ Có lỗi xảy ra khi gửi yêu cầu.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden w-full max-w-6xl">
        {/* Left panel */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/3 p-6 border-r space-y-5">
          <h2 className="text-blue-600 font-semibold mb-2">📤 Tải ảnh lên</h2>

          {/* Nút chọn ảnh tiếng Việt */}
          <div className="space-y-2">
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 inline-block"
            >
              📁 Chọn ảnh từ máy
            </label>
          </div>

          {/* Preview file name list + nút xóa */}
          <ul className="space-y-2 text-sm">
            {images.map((img, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <img src={previews[i]} className="w-6 h-6 object-cover rounded" />
                <span className="flex-1 truncate">{img.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="text-red-500 hover:text-red-700"
                  title="Xóa ảnh"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t">
            <label className="block mb-2 font-medium text-gray-700">📐 Kiểu ghép</label>
            <label className="flex items-center gap-2 mb-1">
              <input type="radio" value="horizontal" checked={mode === 'horizontal'} onChange={() => setMode("horizontal")} />
              Ghép ảnh ngang
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="vertical" checked={mode === 'vertical'} onChange={() => setMode("vertical")} />
              Ghép ảnh dọc
            </label>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">📏 Kích cỡ viền</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded"
              value={borderSize}
              onChange={(e) => setBorderSize(e.target.value)}
              min={0}
              max={1000}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">🎨 Màu viền</label>
            <input
              type="color"
              className="w-full h-10 rounded"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600 font-semibold"
          >
            Tạo ảnh ghép
          </button>
        </form>

        {/* Right panel - Preview */}
        <div className="flex-1 p-6 bg-gray-100 flex flex-col items-center justify-center">
          {previews.length > 0 ? (
            <>
              <div className="bg-white p-4 rounded shadow mb-4">
                <div className={`flex ${mode === 'vertical' ? 'flex-col' : 'flex-row'} gap-${borderSize}`}>
                  {previews.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`preview-${i}`}
                      className="w-32 h-32 object-cover rounded border"
                      style={{
                        borderColor: borderColor,
                        borderWidth: `${borderSize}px`,
                        borderStyle: "solid"
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Chưa có ảnh xem trước.</p>
          )}
        </div>
      </div>
    </div>
  )
}
