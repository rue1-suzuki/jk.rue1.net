import { useState } from 'react'
import choki from './janken/choki.png'
import gu from './janken/gu.png'
import pa from './janken/pa.png'

const hands = [gu, choki, pa,]

const Manual = () => {
  const [handIndex, setHandIndex] = useState<number | null>(null)

  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <>
      <div className='flex justify-center items-center' style={{ minHeight: '20vh' }}>
        <h1 className='text-gray-500 py-2 px-4 text-4xl font-bold text-center'>
          1v1<br />じゃんけん
        </h1>
      </div>

      <div className='flex justify-center items-center' style={{ minHeight: '48vh' }}>
        {isOpen === false && handIndex !== null &&
          <div className='flex justify-center items-center'>
            <span className='text-gray-500' style={{ fontSize: '32vh' }}>
              ？
            </span>
          </div>
        }
        {isOpen && handIndex !== null &&
          <div className='flex justify-center items-center'>
            <img
              onClick={() => {
                setHandIndex(null)
              }}
              src={hands[handIndex]}
              alt={hands[handIndex]}
              style={{
                // width: `${100 / hands.length}%`,
                aspectRatio: '1/1',
                objectFit: 'contain',
                // filter: 'grayscale(100%)',
              }}
            />
          </div>
        }
        {isOpen && handIndex == null &&
          <div className='flex justify-center items-center'>
            {hands.map((hand, index) => {
              // グレースケール
              return (
                <img
                  key={hand}
                  onClick={() => {
                    setHandIndex(index)
                  }}
                  src={hand}
                  alt={hand}
                  style={{
                    width: `${100 / hands.length}%`,
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                    filter: 'grayscale(100%)',
                  }}
                />
              )
            })}
          </div>
        }
      </div>

      <div className='flex justify-center items-center' style={{ minHeight: '20vh' }}>
        <button
          className='font-bold rounded w-[16rem] py-4 text-2xl bg-blue-500 hover:bg-blue-700 text-white'
          type='button'
          onClick={() => {
            if (handIndex === null)
              return alert('出す手を選択してください。')

            setIsOpen((current) => !current)
          }}
          children={isOpen ? <> 隠す </> : <> オープン </>}
        />
      </div>
    </>
  )
}

export default Manual
