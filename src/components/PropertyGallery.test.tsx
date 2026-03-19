import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PropertyGallery from './PropertyGallery';

describe('PropertyGallery', () => {
  const mockImages = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

  it('should display the first image by default', () => {
    render(<PropertyGallery images={mockImages} />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/image1.jpg');
    expect(img).toHaveAttribute('alt', 'Property image 1');
  });

  it('should navigate to next image when clicking next button', () => {
    render(<PropertyGallery images={mockImages} />);
    
    const nextButton = screen.getByRole('button', { name: /next image/i });
    fireEvent.click(nextButton);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/image2.jpg');
    expect(img).toHaveAttribute('alt', 'Property image 2');
  });

  it('should navigate to previous image when clicking previous button', () => {
    render(<PropertyGallery images={mockImages} />);
    
    const prevButton = screen.getByRole('button', { name: /previous image/i });
    fireEvent.click(prevButton);
    
    const img = screen.getByRole('img');
    // Should wrap around to the last image
    expect(img).toHaveAttribute('src', '/image3.jpg');
    expect(img).toHaveAttribute('alt', 'Property image 3');
  });
});