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
    setImages(files)
    const previewUrls = files.map(file => URL.createObjectURL(file))
    setPreviews(previewUrls)
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  if (images.length === 0) return alert("Hãy chọn ảnh.")

  const formData = new FormData()
  images.forEach(img => formData.append("images", img))
  formData.append("mode", mode)
  formData.append("border_size", borderSize)
  formData.append("border_color", borderColor)

  try {
    const taskId = await createTask(formData)
    console.log("Task ID:", taskId)
    navigate(`/processing/${taskId}`)
  } catch (err) {
    console.error("Lỗi tạo task:", err)
  }
}


  return (
    
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden w-full max-w-6xl">
        {/* Left panel */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/3 p-6 border-r space-y-5">
          <h2 className="text-blue-600 font-semibold mb-2">📤 Upload Image</h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600"
          />

          {/* Preview file name list */}
          <ul className="space-y-1 text-sm">
            {images.map((img, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <img src={previews[i]} className="w-6 h-6 object-cover rounded" />
                {img.name}
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t">
            <label className="block mb-2 font-medium text-gray-700">📐 Layout</label>
            <label className="flex items-center gap-2 mb-1">
              <input type="radio" value="horizontal" checked={mode === 'horizontal'} onChange={() => setMode("horizontal")} />
              Horizontal collage
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="vertical" checked={mode === 'vertical'} onChange={() => setMode("vertical")} />
              Vertical collage
            </label>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">📏 Border</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded"
              value={borderSize}
              onChange={(e) => setBorderSize(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">🎨 Color</label>
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
            Make Collage
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
                      style={{ borderColor: borderColor, borderWidth: `${borderSize}px`, borderStyle: "solid" }}
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
