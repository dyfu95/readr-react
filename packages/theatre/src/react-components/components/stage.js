import React from 'react' // eslint-disable-line
import styled from '../../styled-components.js'
import FontElement from '../elements/font.js'
import ImageElement from '../elements/image.js'
import BackgroundElement from '../elements/background.js'
import VideoElement from '../elements/video.js'

const Wrapper = styled.div`
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  margin: auto;
`

export default function Stage({
  objectJson = [],
  sheet,
  setLoadedMedias = () => {},
  setHasMediaError = () => {},
}) {
  if (!objectJson.length) {
    return null
  }

  const handleOnLoad = () => {
    setLoadedMedias((prev) => prev + 1)
  }

  const handleOnError = () => {
    setHasMediaError(true)
  }

  // --------------------------------------

  const fontElements = objectJson
    .filter((data) => data.type === 'FONT')
    .map((data) => {
      return <FontElement key={'font' + data.id} id={data.id} sheet={sheet} />
    })

  const imageElements = objectJson
    .filter((data) => data.type === 'IMAGE')
    .map((data) => {
      return (
        <ImageElement
          key={'image' + data.id}
          id={data.id}
          sheet={sheet}
          onLoad={handleOnLoad}
          onError={handleOnError}
        />
      )
    })

  const bgElements = objectJson
    .filter((data) => data.type === 'BACKGROUND')
    .map((data) => {
      return (
        <BackgroundElement
          key={'background' + data.id}
          id={data.id}
          sheet={sheet}
          onLoad={handleOnLoad}
          onError={handleOnError}
        />
      )
    })

  const videoElements = objectJson
    .filter((data) => data.type === 'VIDEO')
    .map((data) => {
      return (
        <VideoElement
          key={'video' + data.id}
          id={data.id}
          source={data.src}
          sheet={sheet}
          onError={handleOnError}
        />
      )
    })

  return (
    <Wrapper id="theatre-stage">
      {fontElements}
      {imageElements}
      {bgElements}
      {videoElements}
    </Wrapper>
  )
}
