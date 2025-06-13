import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTask } from "../api"

export default function Home() {
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [mode, setMode] = useState("horizontal")
  const [borderSize, setBorderSize] = useState("")
  const [borderColor, setBorderColor] = useState("#ffffff")
  const navigate = useNavigate()
  const maxImages = 5

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (images.length + files.length > maxImages) {
      alert(`Chỉ cho phép tối đa ${maxImages} ảnh.`)
      return
    }

    const newPreviews = files.map(file => URL.createObjectURL(file))
    setImages(prev => [...prev, ...files])
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index) => {
    const newImages = [...images]
    const newPreviews = [...previews]
    newImages.splice(index, 1)
    newPreviews.splice(index, 1)
    setImages(newImages)
    setPreviews(newPreviews)
  }

  const handleBorderSizeChange = (e) => {
    setBorderSize(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (images.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh để ghép.")
      return
    }

    if (borderSize === "") {
      alert("Vui lòng nhập kích cỡ viền.")
      return
    }

    const number = parseInt(borderSize)

    if (isNaN(number)) {
      alert("Kích cỡ viền phải là một số.")
      return
    }

    if (number < 0 || number > 50) {
      alert("Kích cỡ viền phải nằm trong khoảng từ 0 đến 50.")
      return
    }

    const formData = new FormData()
    images.forEach(img => formData.append("images", img))
    formData.append("mode", mode)
    formData.append("border_size", number)
    formData.append("border_color", borderColor)

    try {
      const taskId = await createTask(formData)
      navigate(`/processing/${taskId}`)
    } catch (err) {
      console.error("Lỗi tạo task:", err)
      alert("Đã xảy ra lỗi khi tạo ảnh ghép. Vui lòng thử lại.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden w-full max-w-6xl">
        {/* Left panel */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/3 p-6 border-r space-y-5">
          <h2 className="text-blue-600 font-semibold mb-2">📤 Tải ảnh lên</h2>

          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-block bg-blue-100 text-blue-700 py-2 px-4 rounded hover:bg-blue-200"
            >
              📁 Chọn ảnh
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <ul className="space-y-1 text-sm">
            {images.map((img, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <img src={previews[i]} className="w-6 h-6 object-cover rounded" />
                <span className="truncate max-w-[140px]">{img.name}</span>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="text-red-500 hover:underline ml-auto text-xs"
                >
                  ❌ Xóa
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t">
            <label className="block mb-2 font-medium text-gray-700">📐 Kiểu ghép</label>
            <label className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                value="horizontal"
                checked={mode === "horizontal"}
                onChange={() => setMode("horizontal")}
              />
              Ghép ảnh ngang
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="vertical"
                checked={mode === "vertical"}
                onChange={() => setMode("vertical")}
              />
              Ghép ảnh dọc
            </label>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">📏 Kích cỡ viền</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded"
              value={borderSize}
              onChange={handleBorderSizeChange}
              placeholder="0 - 50"
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

        {/* Right panel */}
        <div className="flex-1 p-6 bg-gray-100 flex flex-col items-center justify-center">
          {previews.length > 0 ? (
<div className="bg-white p-4 rounded shadow mb-4">
  <div
    className={`inline-flex ${mode === "vertical" ? "flex-col" : "flex-row"}`}
    style={{
      backgroundColor: borderColor,
      padding: `${borderSize || 0}px`,
      gap: 0, // Không cần khoảng cách giữa các ảnh
    }}
  >
    {previews.map((url, i) => (
      <img
        key={i}
        src={url}
        alt={`preview-${i}`}
        className="w-32 h-32 object-cover"
        style={{
          display: "block",
        }}
      />
    ))}
  </div>
</div>
          ) : (
            <p className="text-gray-500 text-sm">Chưa có ảnh xem trước.</p>
          )}
        </div>
      </div>
    </div>
  )
}
