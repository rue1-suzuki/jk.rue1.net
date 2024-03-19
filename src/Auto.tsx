import { shuffle } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import choki from './janken/choki.png'
import gu from './janken/gu.png'
import pa from './janken/pa.png'
import sleep from './sleep'

const hands = [gu, pa, choki,]  // 順番固定

const Auto = () => {
  const [disabled, setDisabled] = useState<boolean>(false)

  const [results, setResults] = useState<(boolean | null)[]>(() => {
    return Array(2).fill(true).map(() => null)
  })

  const defaultHandIndex = useMemo(() => {
    if (results.find((result) => result === null) === undefined)
      return Math.floor(Math.random() * hands.length)

    return 0
  }, [results])

  const addPlayerCount = useCallback((add_count: number) => {
    setResults((currents) => {
      const length = currents.length + add_count
      return Array(length > 0 ? length : 1).fill(null)
    })
  }, [])

  const onClick = useCallback(async () => {
    setResults((currents) => Array(currents.length).fill(null))
    setDisabled(true)
    await sleep(800)
    setResults((currents) => shuffle(currents))
    await sleep(800)
    setDisabled(false)
  }, [])

  const gridColsClass = useMemo(() => {
    if (results.length === 1)
      return 'grid-cols-1'
    else if (results.length === 2)
      return 'grid-cols-2'
    else if (results.length / 2 <= 3)
      return 'grid-cols-3'
    return 'grid-cols-4'
  }, [results])

  return (
    <>
      <div className='flex justify-center items-center' style={{ minHeight: '20vh' }}>
        <h1 className='text-gray-500 py-2 px-4 text-4xl font-bold text-center'>
          <span onClick={() => disabled === false && addPlayerCount(-1)}> いちげき </span>
          <br />
          <span onClick={() => disabled === false && addPlayerCount(+1)} > じゃんけん </span>
        </h1>
      </div>

      <div className={`grid gap-1 justify-around items-center ${gridColsClass}`} style={{ minHeight: '48vh' }}>
        {results.map((result, index, currents) => {
          const handIndex = defaultHandIndex + (result ? 1 : 0)
          const hand = [...hands, ...hands][handIndex]

          if (currents.every((current) => current === null) && disabled)
            return null

          if (currents.length > 2)
            return (
              <div className='w-full col-span-1 row-span-1 flex justify-center items-center' key={index}>
                <div className='border bg-gray-100 border-gray-400 rounded'>
                  <div className='text-center font-bold'>
                    <span className='text-gray-500'> {index + 1} </span>
                  </div>
                  <img
                    className='w-full rounded p-1 m-auto'
                    style={{
                      width: result === false ? '80%' : undefined,
                      aspectRatio: '1/1',
                      objectFit: 'contain',
                      filter: result === false ? 'grayscale(100%)' : undefined,
                    }}
                    src={hand}
                    alt={hand}
                  />
                </div>
              </div>
            )

          if (currents.length === 1)
            return (
              <div className='w-full col-span-1 row-span-1 flex justify-center items-center' style={{ maxWidth: '64%', margin: 'auto', }} key={index}>
                <img
                  className='w-full rounded p-1 m-auto'
                  style={{
                    width: result === false ? '80%' : undefined,
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                    filter: result === false ? 'grayscale(100%)' : undefined,
                  }}
                  src={hand}
                  alt={hand}
                />
              </div>
            )

          return (
            <div className='w-full col-span-1 row-span-1 flex justify-center items-center' key={index}>
              <img
                className='w-full rounded p-1 m-auto'
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                  width: result === false ? '80%' : undefined,
                  filter: result === false ? 'grayscale(100%)' : undefined,
                  rotate: results.length === 2
                    ? index % 2 === 0
                      ? '90deg'
                      : '-90deg'
                    : undefined,
                }}
                src={hand}
                alt={hand}
              />
            </div>
          )
        }
        )}
      </div>

      {disabled &&
        <div className='flex justify-center items-center' style={{ minHeight: '20vh' }}>
          {results.every((result) => result === null)
            ? <div className='text-2xl font-bold text-gray-500'> じゃんけん... </div>
            : <div className='text-2xl font-bold text-gray-500'> ポン!! </div>
          }
        </div>
      }

      {disabled === false && results.every((result) => result === null) &&
        <div className='flex justify-center items-center' style={{ minHeight: '20vh' }}>
          <button
            className='font-bold rounded w-[16rem] py-5 text-2xl bg-blue-500 hover:bg-blue-700 text-white'
            type='button'
            onClick={onClick}
            disabled={disabled}
            children={<> スタート </>}
          />
        </div>
      }

      {disabled === false && results.every((result) => result === null) === false &&
        <div className='flex justify-center items-center' style={{ minHeight: '20vh' }}>
          <button
            className='font-bold rounded w-[8rem] py-3 text-xl bg-red-100 hover:bg-red-300 border border-red-300 text-red-700'
            type='button'
            disabled={disabled}
            onClick={() => {
              setResults((currents) => currents.map(() => null))
            }}
            children={<> リセット </>}
          />
        </div>
      }

      {/* プリロードのためhidden */}
      {hands.map((hand) => {
        return (
          <img
            key={hand}
            alt={hand}
            src={hand}
            hidden={true}
          />
        )
      })}

      <div className='mb-3'>
        <div className='text-center text-gray-300'>
          <Link className='text-blue-300 underline' to='manual'>
            1v1モード
          </Link>
        </div>
      </div>
    </>
  )
}

export default Auto
