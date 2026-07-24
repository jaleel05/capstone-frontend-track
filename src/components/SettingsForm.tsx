import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Please enter a valid international phone number' }),
  notifications: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

interface SettingsFormProps {
  onSave: (data: FormData) => void;
}

export function SettingsForm({ onSave }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span id="name-error" style={{ color: 'red' }}>
            {errors.name.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span id="email-error" style={{ color: 'red' }}>
            {errors.email.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <span id="phone-error" style={{ color: 'red' }}>
            {errors.phone.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="notifications">Email Notifications</label>
        <input
          id="notifications"
          type="checkbox"
          {...register('notifications')}
          aria-describedby={errors.notifications ? 'notifications-error' : undefined}
        />
        {errors.notifications && (
          <span id="notifications-error" style={{ color: 'red' }}>
            {errors.notifications.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={!isValid || isSubmitting}>
        Submit
      </button>
    </form>
  );
}
