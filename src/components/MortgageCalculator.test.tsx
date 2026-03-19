import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MortgageCalculator from './MortgageCalculator';

describe('MortgageCalculator', () => {
  const defaultProps = {
    price: 500000,
    interestRate: 6.5,
    downPaymentPercent: 20,
    loanTermYears: 30,
  };

  it('should display initial values correctly', () => {
    render(<MortgageCalculator {...defaultProps} />);
    
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs[0]).toHaveValue(500000);
    expect(inputs[1]).toHaveValue(20);
    expect(inputs[2]).toHaveValue(6.5);
    expect(screen.getByRole('combobox')).toHaveValue('30');
  });

  it('should calculate correct monthly payment with default values', () => {
    render(<MortgageCalculator {...defaultProps} />);
    
    // Loan amount: 500000 - (500000 * 0.20) = 400000
    const results = screen.getAllByText(/down payment:/i);
    expect(results.length).toBeGreaterThan(0);
    
    const results2 = screen.getAllByText(/loan amount:/i);
    expect(results2.length).toBeGreaterThan(0);
    
    const results3 = screen.getAllByText(/monthly payment:/i);
    expect(results3.length).toBeGreaterThan(0);
    
    // Check the calculated values are displayed correctly
    expect(screen.getByText('$400,000')).toBeInTheDocument();
    expect(screen.getByText('$2,528')).toBeInTheDocument();
  });

  it('should update calculations when user changes inputs', () => {
    render(<MortgageCalculator {...defaultProps} />);
    
    // Change the home price
    const priceInput = screen.getAllByRole('spinbutton')[0] as HTMLInputElement;
    fireEvent.change(priceInput, { target: { value: '600000' } });
    
    expect(priceInput).toHaveValue(600000);
    
    // Calculate expected values for new price
    // New down payment: 600000 * 0.20 = 120000
    // New loan amount: 600000 - 120000 = 480000
    expect(screen.getByText('$480,000')).toBeInTheDocument();
    expect(screen.getByText('$120,000')).toBeInTheDocument();
  });
});