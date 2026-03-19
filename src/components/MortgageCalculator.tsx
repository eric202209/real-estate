'use client';

import { useState } from 'react';

interface MortgageCalculatorProps {
  price: number;
  interestRate?: number;
  downPaymentPercent?: number;
  loanTermYears?: number;
}

export default function MortgageCalculator({
  price,
  interestRate = 6.5,
  downPaymentPercent = 20,
  loanTermYears = 30,
}: MortgageCalculatorProps) {
  const [customPrice, setCustomPrice] = useState(price);
  const [customRate, setCustomRate] = useState(interestRate);
  const [customDownPayment, setCustomDownPayment] = useState(downPaymentPercent);
  const [customTerm, setCustomTerm] = useState(loanTermYears);

  const downPayment = (customPrice * customDownPayment) / 100;
  const loanAmount = customPrice - downPayment;
  const monthlyRate = customRate / 100 / 12;
  const numberOfPayments = customTerm * 12;

  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Mortgage Calculator</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Home Price ($)
          </label>
          <input
            type="number"
            value={customPrice}
            onChange={(e) => setCustomPrice(Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Down Payment ({customDownPayment}%)
          </label>
          <input
            type="number"
            value={customDownPayment}
            onChange={(e) => setCustomDownPayment(Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Interest Rate ({customRate}%)
          </label>
          <input
            type="number"
            step="0.1"
            value={customRate}
            onChange={(e) => setCustomRate(Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Loan Term ({customTerm} years)
          </label>
          <select
            value={customTerm}
            onChange={(e) => setCustomTerm(Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={15}>15 years</option>
            <option value={20}>20 years</option>
            <option value={30}>30 years</option>
          </select>
        </div>

        <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Down Payment:</span>
            <span className="font-medium">${downPayment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Loan Amount:</span>
            <span className="font-medium">${loanAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-gray-900">Monthly Payment:</span>
            <span className="text-blue-600">${monthlyPayment.toLocaleString(undefined, {
              maximumFractionDigits: 0
            })}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Total Interest:</span>
            <span>${totalInterest.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
