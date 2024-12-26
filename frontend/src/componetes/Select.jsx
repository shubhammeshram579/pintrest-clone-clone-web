import React , {useId,forwardRef} from 'react'


// select option card
function Select({
    options,
    label,
    className,
    ...props
}, ref) {

    const id = useId();

  return (
    <div className='w-full mt-5'>
        {
            label && <label htmlFor={id} className=''>{label}</label>
        }

        <select {...props} id={id} ref={ref} className={`py-3 rounded-lg text-black outline-none focus:bg-gray-50duration-200 border border-gray-200 w-full 
     ${className}`}>
        {options?.map((option) => (
          <option  value={option} key={option}>{option}

          </option>
        ))}
     </select>

    </div>
  )
}

export default React.forwardRef(Select)