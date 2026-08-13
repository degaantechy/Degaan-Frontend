import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ContactForm({ onSubmit, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div className="form-group">
        <label>Name *</label>
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
          placeholder="Your name"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          type="email"
          placeholder="your@email.com"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Phone *</label>
        <input
          {...register('phone', { required: 'Phone is required' })}
          type="tel"
          placeholder="+252..."
        />
        {errors.phone && <span className="error">{errors.phone.message}</span>}
      </div>

      <div className="form-group">
        <label>Interest Type *</label>
        <select {...register('interest_type', { required: 'Please select' })}>
          <option value="">Select...</option>
          <option value="buy">Buy Property</option>
          <option value="sell">Sell Property</option>
          <option value="construction">Construction</option>
          <option value="investment">Investment</option>
        </select>
        {errors.interest_type && <span className="error">{errors.interest_type.message}</span>}
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          {...register('message')}
          placeholder="Tell us more about your inquiry..."
          rows="5"
        ></textarea>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
