import React from 'react';
import { render, screen } from '@testing-library/react';
import PublicationPage from '../src/app/publication/page';
import { LanguageProvider } from '../src/context/LanguageContext';

// Mock Framer Motion to render child content without animation in JSDOM
jest.mock('framer-motion', () => {
  const React = require('react');
  const Dummy = React.forwardRef(({ children, ...props }: any, ref: any) => {
    // filter out framer-motion specific props to avoid React warnings on DOM elements
    const {
      initial, animate, variants, whileInView, viewport, transition, ...validProps
    } = props;
    return <div ref={ref} {...validProps}>{children}</div>;
  });
  Dummy.displayName = 'DummyMotion';

  return {
    motion: {
      div: Dummy,
      section: Dummy,
    },
  };
});

describe('PublicationPage', () => {
  const renderWithLanguage = (ui: React.ReactElement) => {
    return render(
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    );
  };

  it('renders the hero section correctly', () => {
    renderWithLanguage(<PublicationPage />);
    
    // Check if the hero title exists (it should fallback to translation keys if not fully loaded, 
    // but with our mock Provider it will render the english strings if it's default, or keys)
    // Since LanguageProvider loads from JSONs, we can check for text.
    expect(screen.getByText(/Scientific Research|Nghiên cứu Khoa học/)).toBeInTheDocument();
  });

  it('renders all 5 research sections', () => {
    renderWithLanguage(<PublicationPage />);
    
    // Abstract
    expect(screen.getByText(/Abstract|Tóm tắt/)).toBeInTheDocument();
    
    // Methodology
    expect(screen.getByText(/Methodology|Phương pháp luận/)).toBeInTheDocument();
    
    // Datasets
    expect(screen.getByText(/Datasets|Dữ liệu/)).toBeInTheDocument();
    
    // Results
    expect(screen.getByText(/Results|Kết quả/)).toBeInTheDocument();
    
    // Future opportunity
    expect(screen.getByText(/Future opportunity|Cơ hội trong tương lai/)).toBeInTheDocument();
  });
});
