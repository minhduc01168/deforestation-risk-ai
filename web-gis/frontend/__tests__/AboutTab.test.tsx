import { render, screen } from '@testing-library/react'
import AboutTab from '@/components/AboutTab'

describe('AboutTab', () => {
  it('renders all sections correctly', () => {
    render(<AboutTab />)
    
    // Check if the main heading exists
    expect(screen.getByText('Về dự án')).toBeInTheDocument()
    
    // Check if Data Sources section exists
    expect(screen.getByText('Nguồn dữ liệu')).toBeInTheDocument()
    
    // Check if Usage Instructions exists
    expect(screen.getByText('Hướng dẫn')).toBeInTheDocument()
    
    // Check if some specific content is rendered
    expect(screen.getByText(/Hệ thống Bản đồ Cảnh báo & Giám sát Mất rừng/)).toBeInTheDocument()
    expect(screen.getByText(/Global Forest Watch/)).toBeInTheDocument()
  })
})
