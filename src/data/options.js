import { useLocation } from 'react-router-dom'

export const usePageStyles = (user) => {
  const location = useLocation()
  const isTeachersPage = location.pathname === '/teachers'
  const isFavoritePage = location.pathname === '/favorite'

  return {
    isSpecialPage: user && (isTeachersPage || isFavoritePage),
    isTeachersWithoutUser: !user && isTeachersPage,
  }
}

export const levels = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
]

export const languages = [
  'English',
  'French',
  'German',
  'Italian',
  'Korean',
  'Mandarin Chinese',
  'Spanish',
  'Vietnamese',
]

export const prices = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 35, label: '35' },
  { value: 40, label: '40' },
]

export const options = [
  { value: 'career', label: 'Career and business' },
  { value: 'kids', label: 'Lessons for kids' },
  { value: 'abroad', label: 'Living abroad' },
  { value: 'exams', label: 'Exams and coursework' },
  { value: 'culture', label: 'Culture, travel, or hobby' },
]

export const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '14px',
    height: '48px',
    paddingLeft: '10px',
    paddingRight: '2px',
    margin: '0',
    color: '#121417',
    backgroundColor: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    ':focus': {
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      color: '#121417',
    },
    ':active': {
      border: 'none',
      boxShadow: 'none',
      color: '#121417',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '14px',
    padding: '14px 0 14px 10px',
    border: 'none',
    boxShadow: 'none',
    zIndex: '1900',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#121417' : 'rgba(18, 20, 23, 0.2)',
    ':active': {
      backgroundColor: 'transparent',
    },
    ':focus': {
      backgroundColor: 'transparent',
    },
    fontWeight: '500',
    fontSize: '18px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
}
