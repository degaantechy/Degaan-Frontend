import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLanguage } from '../contexts/LanguageContext'

export default function ContactForm({ onSubmit, loading, context = {} }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { interest_type: context.interestType || '' },
  })
  const { language, t } = useLanguage()

  useEffect(() => {
    if (context.interestType) setValue('interest_type', context.interestType)
  }, [context.interestType, setValue])

  const labels = language === 'so' ? {
    development: 'Xiisaha Mashruuc / Development',
    valuation: 'Qiimaynta Hantida',
    landowner: 'Mulkiile Dhul / Joint Development',
    budget: 'Miisaaniyadda qiyaasta ah',
    preferred: 'Habka xidhiidhka aad doorbidayso',
    unit: 'Nooca unit-ka aad danaynayso',
    location: 'Goobta mashruuca / hantida',
    timeline: 'Goorma ayaad rabtaa inaad bilowdo?',
    optional: 'Ikhtiyaari',
    contextProject: 'Waxaad ka soo gashay mashruuca',
    contextService: 'Waxaad ka soo gashay adeegga',
  } : {
    development: 'Development / Project Interest',
    valuation: 'Property Valuation',
    landowner: 'Landowner / Joint Development',
    budget: 'Indicative budget',
    preferred: 'Preferred contact method',
    unit: 'Preferred unit type',
    location: 'Project / property location',
    timeline: 'Target timing',
    optional: 'Optional',
    contextProject: 'Project enquiry',
    contextService: 'Service enquiry',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      {(context.projectLabel || context.serviceLabel) && (
        <div className="contact-context">
          <strong>{context.projectLabel ? labels.contextProject : labels.contextService}</strong>
          <span>{context.projectLabel || context.serviceLabel}</span>
        </div>
      )}

      <div className="form-row-two">
        <div className="form-group">
          <label>{t('form.name')} *</label>
          <input {...register('name', { required: t('form.nameRequired') })} type="text" placeholder={t('form.namePlaceholder')} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>{t('form.phone')} *</label>
          <input {...register('phone', { required: t('form.phoneRequired') })} type="tel" placeholder="+252..." />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>{t('form.email')} *</label>
        <input
          {...register('email', {
            required: t('form.emailRequired'),
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('form.emailInvalid') },
          })}
          type="email"
          placeholder="your@email.com"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>{t('form.interest')} *</label>
        <select {...register('interest_type', { required: t('form.selectRequired') })}>
          <option value="">{t('form.select')}</option>
          <option value="development">{labels.development}</option>
          <option value="buy">{t('form.buy')}</option>
          <option value="sell">{t('form.sell')}</option>
          <option value="construction">{t('form.construction')}</option>
          <option value="valuation">{labels.valuation}</option>
          <option value="investment">{t('form.investment')}</option>
          <option value="landowner">{labels.landowner}</option>
        </select>
        {errors.interest_type && <span className="error">{errors.interest_type.message}</span>}
      </div>

      <div className="form-row-two">
        <div className="form-group">
          <label>{labels.budget} <small>({labels.optional})</small></label>
          <select {...register('budget_range')}>
            <option value="">{t('form.select')}</option>
            <option value="under-50k">Under USD 50K</option>
            <option value="50k-100k">USD 50K–100K</option>
            <option value="100k-250k">USD 100K–250K</option>
            <option value="250k-500k">USD 250K–500K</option>
            <option value="500k-plus">USD 500K+</option>
            <option value="feasibility-first">{language === 'so' ? 'Marka hore feasibility' : 'Need feasibility first'}</option>
          </select>
        </div>
        <div className="form-group">
          <label>{labels.preferred} <small>({labels.optional})</small></label>
          <select {...register('preferred_contact')}>
            <option value="">{t('form.select')}</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">{language === 'so' ? 'Telefoon' : 'Phone call'}</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>

      {context.projectSlug && (
        <div className="form-group">
          <label>{labels.unit} <small>({labels.optional})</small></label>
          <input {...register('unit_type')} type="text" placeholder={language === 'so' ? 'Tusaale: 2-bedroom, 3-bedroom, villa...' : 'e.g. 2-bedroom, 3-bedroom, villa...'} />
        </div>
      )}

      <div className="form-row-two">
        <div className="form-group">
          <label>{labels.location} <small>({labels.optional})</small></label>
          <input {...register('project_location')} type="text" placeholder={language === 'so' ? 'Hargeysa, Berbera, Arabsiyo...' : 'Hargeisa, Berbera, Arabsiyo...'} />
        </div>
        <div className="form-group">
          <label>{labels.timeline} <small>({labels.optional})</small></label>
          <input {...register('timeline')} type="text" placeholder={language === 'so' ? 'Tusaale: 3 bilood gudahood' : 'e.g. within 3 months'} />
        </div>
      </div>

      <div className="form-group">
        <label>{t('form.message')}</label>
        <textarea {...register('message')} placeholder={t('form.messagePlaceholder')} rows="5"></textarea>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? t('form.sending') : t('form.send')}
      </button>
    </form>
  )
}
