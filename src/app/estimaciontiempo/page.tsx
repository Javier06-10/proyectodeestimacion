'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Estimacioncoste from '../estimacioncoste/page';


interface VariablesDeCalculo {
  optimista: number | '';
  pesimista: number | '';
  probable: number | '';
}


export default function Estimaciontiempo() {
  const [values, setValues] = useState<VariablesDeCalculo>({
    optimista: '',
    pesimista: '',
    probable: '',
  });
  const [resultado, setResultado] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: keyof VariablesDeCalculo) => (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = raw === '' ? '' : Number(raw);
    setValues(prev => ({ ...prev, [key]: parsed }));
    setError(null);
    setResultado(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { optimista, pesimista, probable } = values;

    if (optimista === '' || pesimista === '' || probable === '') {
      setError('Por favor completa las tres variables.');
      return;
    }
    if (optimista > pesimista) {
      setError('El valor optimista no puede ser mayor que el pesimista.');
      return;
    }

    // Estimación PERT: (O + 4*M + P) / 6
    const est = (optimista + 4 * probable + pesimista) / 6;
    setResultado(est);
    setError(null);
  };

  const reset = () => {
    setValues({ optimista: '', pesimista: '', probable: '' });
    setResultado(null);
    setError(null);
  };

  return (
    <>
      <h1 style={{ padding: 30, fontSize: 40, color: 'purple' }}>

       <strong> Bienvenido a su App de Estimación por PERT</strong>
      </h1>

      <form onSubmit={handleSubmit} style={{ padding: 20, maxWidth: 720 }}>
        <h3 style={{ fontSize: 24, marginBottom: 12 }}>Introduce las tres variables de tiempo en semanas</h3>

        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
            Optimista
            <input
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Valor optimista"
              value={values.optimista === '' ? '' : String(values.optimista)}
              onChange={handleChange('optimista')}
              style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
            Más probable
            <input
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Valor más probable"
              value={values.probable === '' ? '' : String(values.probable)}
              onChange={handleChange('probable')}
              style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
            Pesimista
            <input
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="Valor pesimista"
              value={values.pesimista === '' ? '' : String(values.pesimista)}
              onChange={handleChange('pesimista')}
              style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
            />
          </label>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="submit"
            style={{
              padding: '10px 18px',
              borderRadius: 20,
              backgroundColor: 'purple',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Calcular
          </button>

          <button
            type="button"
            onClick={reset}
            style={{
              padding: '10px 18px',
              borderRadius: 20,
              backgroundColor: 'green',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>

        {error && <p style={{ color: 'crimson', marginTop: 12 }}>{error}</p>}

        {resultado !== null && (
          <div style={{ marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: '#fafafa' }}>
            <strong style={{color:"purple"}}>Resultado en semanas (PERT):</strong>{' '}
            <span style={{color:"green"}}>{resultado.toFixed(2)} Semanas</span>
            <div style={{ marginTop: 8, color: '#555' }}>
              Fórmula: (Optimista + 4·Más probable + Pesimista) / 6
            </div>
          </div>
        )}
      </form>
          <Estimacioncoste/>
    </>

  );
  
}
