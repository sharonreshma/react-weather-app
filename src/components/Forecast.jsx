import React from 'react';

const Forecast = ({ title, data }) => {
  return (
    <div>
      <div className='flex items-center justify-start my-6'>
        <p className='text-white font-medium uppercase'>
          {title}
        </p>
      </div>
      <hr className='my-1' />
      <div className='flex items-center justify-between text-white'>
        {data.map((d, index) => (
          <div key={index} className='flex flex-col items-center justify-center text-center'> {/* Ensure text-center for day */}
            <p className='font-light text-sm'>{d.day}</p> {/* Display day */}
            <p className='font-light text-sm'>{d.time}</p>
            <img src={d.icon} className='w-12 my-1' alt="" />
            <p className='font-medium'>{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
