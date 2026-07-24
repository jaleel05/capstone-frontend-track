import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SettingsForm } from './SettingsForm';
import { describe, it, expect, vi } from 'vitest';

describe('SettingsForm', () => {
  it('renders all fields', () => {
    render(<SettingsForm onSave={vi.fn()} />);
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Notifications/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('shows validation error for empty name', async () => {
    render(<SettingsForm onSave={vi.fn()} />);
    
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: 'a' } }); // Min 2 chars
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      expect(screen.getByText(/Name must be at least 2 characters long/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<SettingsForm onSave={vi.fn()} />);
    
    const emailInput = screen.getByLabelText(/^Email$/i);
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('submit button is disabled when invalid', async () => {
    render(<SettingsForm onSave={vi.fn()} />);
    
    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    expect(submitBtn).toBeDisabled(); // Initially invalid because fields are empty and required
    
    // Fill out partially
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Valid Name' } });
    
    await waitFor(() => {
      expect(submitBtn).toBeDisabled(); // Still invalid due to missing email/phone
    });
  });

  it('calls onSave with correct data on valid submit', async () => {
    const onSaveMock = vi.fn();
    render(<SettingsForm onSave={onSaveMock} />);
    
    // Fill out valid data
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '+1234567890' } });
    fireEvent.click(screen.getByLabelText(/Email Notifications/i)); // Toggle checkbox
    
    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    
    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
    
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(onSaveMock).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        notifications: true,
      });
      expect(onSaveMock).toHaveBeenCalledTimes(1);
    });
  });
});
