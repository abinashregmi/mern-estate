import React from 'react';

export default function CreateListing() {
  const inputStyle =
    'border p-3 rounded-lg bg-white border-gray-300 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500';

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-6'>
        {/* LEFT COLUMN */}
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className={inputStyle}
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <input
            type='text'
            placeholder='Description'
            className={inputStyle}
            id='description'
            maxLength='62'
            minLength='10'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className={inputStyle}
            id='address'
            required
          />

          {/* CHECKBOXES */}
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking spot</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>

          {/* NUMBER FIELDS */}
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg bg-white w-20'
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg bg-white w-20'
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                required
                className='p-3 border border-gray-300 rounded-lg bg-white w-24'
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                <span className='text-xs'>(Rs. / month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountedPrice'
                min='1'
                required
                className='p-3 border border-gray-300 rounded-lg bg-white w-24'
              />
              <div className='flex flex-col items-center'>
                <p>Discounted price</p>
                <span className='text-xs'>(Rs. / month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — IMAGES */}
        <div className='flex flex-col flex-1 gap-4 self-start'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className='flex gap-4'>
            <input
              className='p-3 border border-gray-300 rounded w-full bg-white
              file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:rounded
              hover:file:bg-gray-200'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              className='p-3 text-green-700 border border-green-700 rounded
              uppercase hover:shadow-lg disabled:opacity-80'
            >
              Upload
            </button>
          </div>

          <button
            className='p-3 bg-slate-700 text-white rounded-lg uppercase
            hover:opacity-95 disabled:opacity-80'
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}