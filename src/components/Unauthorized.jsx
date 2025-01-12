import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>دسترسی غیرمجاز</h1>
      <p style={styles.message}>شما اجازه دسترسی به این صفحه را ندارید.</p>
      <p style={styles.message}>لطفا وارد حساب کاربری خود شوید.</p>
      <div style={styles.buttonContainer}>
        <button  className='w-fit p-2 block bg-[var(--color-febd69)] rounded-md hover:bg-black hover:text-[var(--color-febd69)] transition-all duration-300 ease-linear ' onClick={() => navigate('/')}>
          بازگشت به صفحه اصلی
        </button>
        <button  className='w-fit p-2 block bg-[var(--color-febd69)] rounded-md hover:bg-black hover:text-[var(--color-febd69)] transition-all duration-300 ease-linear ' onClick={() => navigate('/login')}>
          ورود به حساب کاربری
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20vh',
    height:'50vh',
  },
  title: {
    fontSize: '2rem',
    color: '#d32f2f',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#1976d2',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1565c0',
  },
};

export default Unauthorized;
