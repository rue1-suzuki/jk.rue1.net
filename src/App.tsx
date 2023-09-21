import { useCallback, useMemo, useState } from 'react'
import choki from './janken/choki.png'
import gu from './janken/gu.png'
import pa from './janken/pa.png'
import fisherYatesShuffle from './shuffle'

const hands = [gu, pa, choki,] // 固定

export const App = () => {
  const [disabled, setDisabled] = useState<boolean>(false)

  const [players, setPlayers] = useState<(boolean | null)[]>(() => {
    return Array(2).fill(true).map(() => null)
  })

  const defaultHandIndex = useMemo(() => {
    if (players.find((player) => player === null) === undefined)
      return Math.floor(Math.random() * hands.length)

    return 0
  }, [players])

  const addPlayerCount = useCallback((add_count: number) => {
    setPlayers((currentPlayers) => {
      const length = currentPlayers.length + add_count
      return Array(length > 0 ? length : 1).fill(null)
    })
  }, [])

  const onClick = useCallback(() => {
    setPlayers((currentPlayers) => currentPlayers.map(() => null))
    setDisabled(true)

    setTimeout(() => {
      setPlayers((currentPlayers) => {
        currentPlayers.fill(false)
        currentPlayers[0] = true

        // [true, false, ...] をシャッフル
        return fisherYatesShuffle(currentPlayers)
      })
      setTimeout(() => {
        setDisabled(false)
      }, 800)
    }, 800)
  }, [])

  return (
    <>
      <header>
        <h1>
          <span onClick={() => disabled === false && addPlayerCount(-1)}> 一撃 </span>
          <span onClick={() => disabled === false && addPlayerCount(+1)} > じゃんけん </span>
        </h1>
      </header>

      <main>
        {players.map((player, index) => {
          const handIndex = defaultHandIndex + (player ? 1 : 0)
          const hand = [...hands, ...hands][handIndex]

          const width = players.length === 1 ? '100%' : players.length === 2 ? '50%' : '30%'
          const rotate = players.length === 2 ? index % 2 === 0 ? '90deg' : '-90deg' : undefined

          if (player === null) {
            if (disabled) {
              return (
                <div style={{ rotate: rotate, width: width, }} key={index}>
                  <div style={{ display: 'flex', justifyContent: 'center', }}>
                    {hands.map((hand) => {
                      return (
                        <img
                          style={{
                            width: `${100 / (hands.length + 1)}%`,
                            filter: `grayscale(${100}%)`,
                          }}
                          key={hand}
                          src={hand}
                          alt={hand}
                        />
                      )
                    })}
                  </div>
                  <span> じゃんけん... </span>
                </div>
              )
            }

            return (
              <div style={{ rotate: rotate, width: width, }} key={index}>
                {players.length > 2 && <span className='span-index'> {index + 1} </span>}
                <img
                  className='img-hand-winner'
                  src={hand}
                  alt={hand}
                />
              </div>
            )
          }

          return (
            <div style={{ rotate: rotate, width: width, }} key={index}>
              {players.length > 2 &&
                <span className='span-index'>
                  {index + 1}
                </span>
              }
              <img
                className={player ? 'img-hand-winner' : 'img-hand-loser'}
                src={hand}
                alt={hand}
              />
              {players.length > 1 &&
                <span className={player ? 'span-result-winner' : 'span-result-loser'}>
                  {player ? <> WIN </> : <> LOSE </>}
                </span>
              }
            </div>
          )
        })}
      </main>

      <footer>
        <button
          type='button'
          onClick={onClick}
          disabled={disabled}
          children={disabled ? <> じゃんけん... </> : <> スタート </>}
        />
      </footer>
    </>
  )
}
