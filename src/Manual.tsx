import { useState } from 'react'
import choki from './janken/choki.png'
import gu from './janken/gu.png'
import pa from './janken/pa.png'

const hands = [gu, choki, pa,]

const Manual = () => {
  const [selectedHand, setSelectedHand] = useState<string | null>(null)

  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <>
      <div className='flex justify-center items-center' style={{ minHeight: '20vh' }}>
        <h1 className='text-gray-500 py-2 px-4 text-4xl font-bold text-center'>
          1v1<br />じゃんけん
        </h1>
      </div>

      <div className='flex justify-center items-center' style={{ minHeight: '48vh' }}>
        {isOpen === false && selectedHand !== null &&
          <div className='flex justify-center items-center'>
            <span className='text-gray-500' style={{ fontSize: '32vh' }}>
              ？
            </span>
          </div>
        }
        {isOpen && selectedHand !== null &&
          <div className='flex justify-center items-center'>
            <img
              onClick={() => {
                setSelectedHand(null)
              }}
              src={selectedHand}
              alt={selectedHand}
              style={{
                aspectRatio: '1/1',
                objectFit: 'contain',
              }}
            />
          </div>
        }
        {isOpen && selectedHand == null &&
          <div className='flex justify-center items-center'>
            {hands.sort(() => Math.random() - 0.5).map((hand) => {
              return (
                <img
                  key={hand}
                  src={hand}
                  alt={hand}
                  onClick={() => {
                    setSelectedHand(hand)
                  }}
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
        {isOpen &&
          <button
            className='font-bold rounded w-[16rem] py-4 text-xl bg-gray-500 active:bg-gray-700 hover:bg-gray-700 text-white m-1'
            type='button'
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * hands.length)
              const randamHand = hands[randomIndex]
              setSelectedHand(randamHand)
            }}
            children={<> ランダム選択 </>}
          />
        }
        <button
          className='font-bold rounded w-[16rem] py-4 text-xl bg-blue-500 active:bg-blue-700 hover:bg-blue-700 text-white m-1'
          type='button'
          onClick={() => {
            if (selectedHand === null)
              return alert('出す手を選択してください。')

            setIsOpen((current) => !current)
          }}
          children={isOpen ? <> 伏せる </> : <> オモテにする </>}
        />
      </div>
    </>
  )
}

export default Manual
