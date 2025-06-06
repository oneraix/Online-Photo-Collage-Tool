import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { checkStatus } from '../api'

export default function Processing() {
  const { taskId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await checkStatus(taskId)
      if (res.status === 'SUCCESS') {
        clearInterval(interval)
        navigate(`/result/${taskId}`)

      } else if (res.status === 'FAILURE') {
        clearInterval(interval)
        alert('❌ Xử lý thất bại.')
        navigate('/')
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [taskId, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Đang xử lý ảnh ghép...</h2>
        <p className="text-gray-500 mt-2">Mã tác vụ: {taskId}</p>
      </div>
    </div>
  )
}
