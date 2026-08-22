import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLanguage } from '../contexts/LanguageContext'

export default function ContactForm({ onSubmit, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { t } = useLanguage()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div className="form-group">
        <label>{t('form.name')} *</label>
        <input
          {...register('name', { required: t('form.nameRequired') })}
          type="text"
          placeholder={t('form.namePlaceholder')}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label>{t('form.email')} *</label>
        <input
          {...register('email', {
            required: t('form.emailRequired'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('form.emailInvalid'),
            },
          })}
          type="email"
          placeholder="your@email.com"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>{t('form.phone')} *</label>
        <input
          {...register('phone', { required: t('form.phoneRequired') })}
          type="tel"
          placeholder="+252..."
        />
        {errors.phone && <span className="error">{errors.phone.message}</span>}
      </div>

      <div className="form-group">
        <label>{t('form.interest')} *</label>
        <select {...register('interest_type', { required: t('form.selectRequired') })}>
          <option value="">{t('form.select')}</option>
          <option value="buy">{t('form.buy')}</option>
          <option value="sell">{t('form.sell')}</option>
          <option value="construction">{t('form.construction')}</option>
          <option value="investment">{t('form.investment')}</option>
        </select>
        {errors.interest_type && <span className="error">{errors.interest_type.message}</span>}
      </div>

      <div className="form-group">
        <label>{t('form.message')}</label>
        <textarea
          {...register('message')}
          placeholder={t('form.messagePlaceholder')}
          rows="5"
        ></textarea>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? t('form.sending') : t('form.send')}
      </button>
    </form>
  )
}
