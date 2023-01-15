import * as React from "react"
import { graphql, HeadFC, PageProps, useStaticQuery } from "gatsby"
import '../styles.scss'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

interface RangeType {
  id: string
  name: string
}
const rangeTypes: RangeType[] = [
  {
    id: 'classic',
    name: 'クラシック',
  },
  {
    id: 'hidenseek',
    name: 'かくれんぼ',
  },
  {
    id: 'umbrer',
    name: 'アンブレイヤー',
  },
]

interface ViewPoint {
  id: string
  name: string
}
const rangeType2ViewPoints: Record<string, ViewPoint[]> = {
  'classic': [
    {
      id: 'classic_crewmate',
      name: 'クルーメイト',
    },
    {
      id: 'classic_impostor',
      name: 'インポスター',
    },
  ],
  'hidenseek': [
    {
      id: 'hidenseek_crewmate',
      name: 'クルーメイト',
    },
    {
      id: 'hidenseek_impostor',
      name: 'インポスター',
    },
  ],
  'umbrer': [
    {
      id: 'umbrer_crewmate',
      name: 'クルーメイト',
    },
    {
      id: 'umbrer_umbrer',
      name: 'アンブレイヤー',
    },
  ],
}

interface RangeValue {
  id: string
  name: string
}
const rangeType2RangeValues: Record<string, RangeValue[]> = {
  'classic': [
    {
      id: 'classic_short',
      name: 'ショート',
    },
    {
      id: 'classic_middle',
      name: 'ミドル',
    },
    {
      id: 'classic_long',
      name: 'ロング',
    },
  ],
  'hidenseek': [
    {
      id: 'hidenseek_short',
      name: 'ショート',
    },
  ],
  'umbrer': [
    {
      id: 'umbrer_0.5',
      name: '0.5',
    },
    {
      id: 'umbrer_0.7',
      name: '0.7',
    },
    {
      id: 'umbrer_1.0',
      name: '1.0',
    },
    {
      id: 'umbrer_1.5',
      name: '1.5',
    },
    {
      id: 'umbrer_2.0',
      name: '2.0',
    },
    {
      id: 'umbrer_2.5',
      name: '2.5',
    },
    {
      id: 'umbrer_3.0',
      name: '3.0',
    },
  ],
}

const IndexPage: React.FC<PageProps> = () => {
  const rangeImagesData = useStaticQuery<Queries.GetRangeImagesQuery>(graphql`
    query GetRangeImages {
      allFile(filter: {
        sourceInstanceName: {eq: "range_images"}
        extension: {eq: "png"}
      }) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  const [selectedRangeType, setSelectedRangeType] = React.useState<RangeType>(rangeTypes[0])
  const [selectedViewPoint, setSelectedViewPoint] = React.useState<ViewPoint>(rangeType2ViewPoints['classic'][0])
  const [selectedRangeValue, setSelectedRangeValue] = React.useState<RangeValue>(rangeType2RangeValues['classic'][0])

  const viewPoints = rangeType2ViewPoints[selectedRangeType.id] ?? []
  React.useEffect(() => {
    if (! viewPoints.map((viewPoint) => viewPoint.id).includes(selectedViewPoint.id)) {
      setSelectedViewPoint(viewPoints[0])
    }
  }, [viewPoints, selectedViewPoint])

  const rangeValues = rangeType2RangeValues[selectedRangeType.id] ?? []
  React.useEffect(() => {
    if (! rangeValues.map((rangeValue) => rangeValue.id).includes(selectedRangeValue.id)) {
      setSelectedRangeValue(rangeValues[0])
    }
  }, [rangeValues, selectedRangeValue])

  const rangeImageSharp = rangeImagesData.allFile.edges.find(
    (edge) =>
      edge.node.relativePath === `${selectedRangeType.id}/${selectedViewPoint.id}/${selectedRangeValue.id}.png`
  )?.node.childImageSharp ?? null
  const rangeImage = getImage(rangeImageSharp)

  return (
    <main className='container p-6'>
      <h1 className='is-size-3'>
        Among Us Range
      </h1>
      <h2 className='is-size-7 mb-5'>
        Among Us v2022.12.14 / Extreme Roles v5.0.0.6
      </h2>
      <div className='columns'>
        <div className='column'>
          <div className='field'>
            <label className='label'>
              レンジの種類
            </label>
            <div className='control'>
              {rangeTypes.map((rangeType) => (
                <button
                key={rangeType.id}
                className={`button ${selectedRangeType.id === rangeType.id ? 'is-dark' : ''}`}
                  onClick={() => { setSelectedRangeType(rangeType); }}
                >
                    {rangeType.name}
                  </button>
              ))}
            </div>
          </div>
          <div className='field'>
            <label className='label'>
              視点
            </label>
            <div className='control'>
              {viewPoints.map((viewPoint) => (
                <button
                  key={viewPoint.id}
                  className={`button ${selectedViewPoint.id === viewPoint.id ? 'is-dark' : ''}`}
                  onClick={() => { setSelectedViewPoint(viewPoint); }}
                >
                    {viewPoint.name}
                  </button>
              ))}
            </div>
          </div>
          <div className='field'>
            <label className='label'>
              レンジ
            </label>
            <div className='control'>
              {rangeValues.map((rangeValue) => (
                <button
                  key={rangeValue.id}
                  className={`button ${selectedRangeValue.id === rangeValue.id ? 'is-dark' : ''}`}
                  onClick={() => { setSelectedRangeValue(rangeValue); }}
                >
                    {rangeValue.name}
                  </button>
              ))}
            </div>
          </div>
        </div>
        <div className='column'>
          {rangeImage !== undefined ? (
            <GatsbyImage image={rangeImage} alt='' />
          ) : ''}
        </div>
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
