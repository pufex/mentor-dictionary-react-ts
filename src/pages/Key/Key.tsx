import React, { useEffect, useState } from 'react'
import "./Key.css"
import ExternalLink from '../../components/ExternalLink/ExternalLink'
import { useParams } from 'react-router-dom'
import { useKeysContext } from '../../App'
import type { KeyDict, MeaningType } from '../../App'
import Search from '../../components/Search/Search'
import ReactPlayer from 'react-player'

type AudioState = {
  url?: string,
  playing: boolean,
  loop: boolean,
}

const Key = (): React.ReactElement => {

  let { id } = useParams();

  const keys: KeyDict = useKeysContext()?.find((key) => key.word == id)!;

  useEffect(() => {
    console.log(keys.phonetics[1].audio)
  }, [keys])

  const [audioState, setAudioState] = useState<AudioState>({
    url: keys.phonetics[0].audio,
    playing: false,
    loop: false,
  });
  const { url, playing, loop } = audioState

  const audioPlayHandler = () => {
    setAudioState({ ...audioState, playing: !playing, })
  }
  
  const audioEndedHandler = () => {
    setAudioState({ ...audioState, playing: false, })
  }

  return <>
    <ReactPlayer
      width={0}
      height={0}
      url={url}
      playing={playing}
      loop={loop}
      onEnded={audioEndedHandler}
    />
    <main
      className="key-container__main"
    >
      <div className="search-component-container">
        <Search
          placeholder="Search again..."
          defaultValue={id}
        />
      </div>
      <div
        className="key-container"
      >
        <header className="key-container__header">
          <section className="key-container__header--left">
            <h1 className="key__word">
              {keys.word}
            </h1>
            <span className="key__text">
              {keys.phonetic}
            </span>
          </section>
          <section className="key-container__header--right">
            {
              url == "" || !url
                ? <span
                  className="no-audio__message"
                >
                  No audio available
                </span>
                : <button
                  
                  className={
                    playing 
                      ? "btn btn--playAudio active"
                      : "btn btn--playAudio"
                  }
                  onClick={audioPlayHandler}
                ></button>
            }
          </section>
        </header>
        <section className="key-container__meanings">
          {
            keys.meanings.map((meaning) => {
              return <Meaning
                meaning={meaning}
              />
            })
          }
        </section>
      </div>
      <div className="key-container__source-container">
        <span 
          className='key-container__source__nomem-omen'
        >
          Source
        </span>
        <ExternalLink>
          {
            keys.sourceUrls[0]
          }
        </ExternalLink>
      </div>
    </main>
  </>

}

export default Key

type MeaningProps = {
  meaning: MeaningType,
}

const Meaning = ({meaning}: MeaningProps): React.ReactElement => {

  console.log(meaning)

  return <div
    className="meaning__container"
  >
    <div className="meaning__heading">
      <span className="meaning__partOfSpeech">
        {meaning.partOfSpeech}
      </span>
    </div>
    <div className="meaning__content">
      <h2 className="meaning__nomen-omen">
        Meaning/s
      </h2>
      <ul className="meanings__list">
        {
          meaning.definitions.map(({ definition }) => {
            return <li
              className="meaning__definition"
            >
              {definition}
            </li>
          })
        }
      </ul>
    </div>
    <div className="meaning__synonyms">
      <span className="meaning__synonyms-title">
        Synonyms:
      </span>
      <div className="meaning__synonyms-container">
        {
          meaning.synonyms.length != 0 
          ? meaning.synonyms?.map((synonym, index) => {
            return <span
              className="meaning__synonym"
            > 
              {`${synonym}${index+1 < meaning.synonyms.length
                  ? ", "
                  : ""}
              `}
            </span>
          })
          : <span
            className="no-synonyms__message"
          >
            No synonyms!
          </span>
        }

      </div>
    </div>
  </div>
}
