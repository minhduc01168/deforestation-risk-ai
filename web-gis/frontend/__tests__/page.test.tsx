import { render, screen, fireEvent } from '@testing-library/react'
import Home from '@/app/page'

// Mock dynamic import for MapComponent
jest.mock('next/dynamic', () => () => {
  return function MockMap() {
    return <div data-testid="mock-map">Mocked Map</div>
  }
})

describe('Home Page', () => {
  it('renders correctly with default controls tab', () => {
    render(<Home />)
    
    // Header
    expect(screen.getByText('Gia Lai Deforestation AI')).toBeInTheDocument()
    
    // Sliders
    expect(screen.getByText('Độ cao tối đa')).toBeInTheDocument()
    expect(screen.getByText('Lượng mưa tối đa')).toBeInTheDocument()
    expect(screen.getByText('Độ dốc tối đa')).toBeInTheDocument()
    expect(screen.getByText('Độ che phủ rừng (Tree Cover 2000) tối thiểu')).toBeInTheDocument()
    
    // Mock Map
    expect(screen.getByTestId('mock-map')).toBeInTheDocument()
  })

  it('switches tabs correctly', () => {
    render(<Home />)
    
    // Click on About Tab
    const aboutTabButton = screen.getByText('Dự án')
    fireEvent.click(aboutTabButton)
    
    // Check if About content is visible
    expect(screen.getByText('Về dự án')).toBeInTheDocument()
    expect(screen.getByText('Nguồn dữ liệu')).toBeInTheDocument()
    
    // Click back to Controls Tab
    const controlsTabButton = screen.getByText('Công cụ')
    fireEvent.click(controlsTabButton)
    
    // Check if Controls content is visible again
    expect(screen.getByText('Bộ lọc Môi trường')).toBeInTheDocument()
  })
})
