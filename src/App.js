import React from 'react'
import { Group } from '@vx/group'
import { Tree } from '@vx/hierarchy'
import { LinearGradient } from '@vx/gradient'
import { hierarchy } from 'd3-hierarchy'
import { pointRadial } from 'd3-shape'

import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine
} from '@vx/shape'

const data = {
  name: '',
  children: [
    {
      name: 'J A',
      id: 1,
      gender: 'Female',
      hasParnter: true,
      imageUrl: '/avatar/gravator.jpg'
    },
    {
      name: 'Mr. J A',
      id: 2,
      partnerId: 1,
      noParent: true,
      children: [
        {
          name: 'Parvathi Amma',
          id: 3,
          gender: 'Female',
          isSource: true,
          hasParnter: true
        },
        {
          name: 'MK N A',
          id: 5,
          partnerId: 3,
          gender: 'Male',
          noParent: true,
          children: [
            {
              name: 'Balagopalan K',
              id: 100,
              hasParnter: true
            },
            {
              name: 'Devi MM',
              id: 102,
              partnerId: 100,
              gender: 'Female',
              noParent: true,
              children: [{ name: 'D MM', gender: 'Female' }]
            },
            {
              name: 'MM D',
              id: 102,
              partnerId: 100,
              gender: 'Female',
              noParent: true,
              children: [{ name: 'B MM' }]
            },
            {
              name: 'V PK',
              id: 200,
              gender: 'Female',
              hasParnter: true,
              imageUrl: '/avatar/v-pk.jpeg'
            },
            {
              name: 'EK T N',
              id: 201,
              partnerId: 200,
              noParent: true,
              children: [
                {
                  name: 'S PK',
                  gender: 'Female'
                },
                {
                  name: 'Sku PK'
                },
                {
                  name: 'Sj PK'
                },
                {
                  name: 'Ska PK'
                }
              ]
            },

            {
              name: 'V K',
              id: 300,
              hasParnter: true,
              imageUrl: '/avatar/v-k.jpeg'
            },
            {
              name: 'M PG',
              gender: 'Female',
              id: 301,
              partnerId: 300,
              noParent: true,
              children: [
                {
                  name: 'V K',
                  imageUrl: '/avatar/v-k-1.jpeg'
                },
                {
                  name: 'V KV'
                }
              ]
            },
            {
              name: 'R PK',
              id: 400,
              hasParnter: true
            },
            {
              name: 'S VV',
              gender: 'Female',
              id: 401,
              partnerId: 400,
              noParent: true,
              children: [
                {
                  name: 'A R',
                  gender: 'Female'
                },
                {
                  name: 'C K'
                }
              ]
            }
          ]
        },

        {
          name: 'Dummy',
          id: 4,
          partnerId: 3,
          gender: 'Male',
          noParent: true,
          imageUrl: '/avatar/dummy.png',
          children: [
            {
              name: 'Sam'
            },
            {
              name: 'Thomas'
            }
          ]
        }
      ]
    }
  ]
}

export default class extends React.Component {
  state = {
    layout: 'cartesian',
    orientation: 'horizontal',
    linkType: 'diagonal',
    stepPercent: 1
  }

  constructor(props) {
    super(props)

    this.showOption = this.showOption.bind(this)
  }

  showOption(node) {
    // node.data.isExpanded = !node.data.isExpanded
    // console.log(node)
    // this.forceUpdate()
  }

  render() {
    const {
      width,
      height,
      margin = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
      }
    } = this.props
    let partners = []
    const nameLineHeight = 1.2
    const fontSize = 9

    const circleRadius = 24
    const circleDiameter = circleRadius * 2

    const { layout, orientation, linkType, stepPercent } = this.state

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    let origin
    let sizeWidth
    let sizeHeight

    if (layout === 'polar') {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2
      }
      sizeWidth = 2 * Math.PI
      sizeHeight = Math.min(innerWidth, innerHeight) / 2
    } else {
      origin = { x: 0, y: 0 }
      if (orientation === 'vertical') {
        sizeWidth = innerWidth
        sizeHeight = innerHeight
        /* As root note is hidden, adjust tree's Y positioning */
        origin.y -= sizeHeight / 10
      } else {
        sizeWidth = innerHeight
        sizeHeight = innerWidth
        /* As root note is hidden, adjust tree's X positioning */
        origin.x -= sizeHeight / 10
      }
    }

    let LinkComponent

    if (layout === 'polar') {
      if (linkType === 'step') {
        LinkComponent = LinkRadialStep
      } else if (linkType === 'curve') {
        LinkComponent = LinkRadialCurve
      } else if (linkType === 'line') {
        LinkComponent = LinkRadialLine
      } else {
        LinkComponent = LinkRadial
      }
    } else {
      if (orientation === 'vertical') {
        if (linkType === 'step') {
          LinkComponent = LinkVerticalStep
        } else if (linkType === 'curve') {
          LinkComponent = LinkVerticalCurve
        } else if (linkType === 'line') {
          LinkComponent = LinkVerticalLine
        } else {
          LinkComponent = LinkVertical
        }
      } else {
        if (linkType === 'step') {
          LinkComponent = LinkHorizontalStep
        } else if (linkType === 'curve') {
          LinkComponent = LinkHorizontalCurve
        } else if (linkType === 'line') {
          LinkComponent = LinkHorizontalLine
        } else {
          LinkComponent = LinkHorizontal
        }
      }
    }

    return (
      <div>
        <div style={{ color: 'rgba(38, 150, 136, 1.000)', fontSize: 10 }}>
          <label>layout:</label>
          <select
            onClick={e => e.stopPropagation()}
            onChange={e => this.setState({ layout: e.target.value })}
            value={layout}
          >
            <option value="cartesian">cartesian</option>
            <option value="polar">polar</option>
          </select>

          <label>orientation:</label>
          <select
            onClick={e => e.stopPropagation()}
            onChange={e => this.setState({ orientation: e.target.value })}
            value={orientation}
            disabled={layout === 'polar'}
          >
            <option value="vertical">vertical</option>
            <option value="horizontal">horizontal</option>
          </select>

          <label>link:</label>
          <select
            onClick={e => e.stopPropagation()}
            onChange={e => this.setState({ linkType: e.target.value })}
            value={linkType}
          >
            <option value="diagonal">diagonal</option>
            <option value="step">step</option>
            <option value="curve">curve</option>
            <option value="line">line</option>
          </select>

          <label>step:</label>
          <input
            onClick={e => e.stopPropagation()}
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={e => this.setState({ stepPercent: e.target.value })}
            value={stepPercent}
            disabled={linkType !== 'step' || layout === 'polar'}
          />
        </div>

        <svg width={width} height={height}>
          {/* LinearGradient - lgFemale - Pink gradient */}
          <LinearGradient id="lgFemale" from="#fd9b93" to="#fe6e9e" />
          {/* LinearGradient - lgMale - Green gradient */}
          <LinearGradient id="lgMale" from="#13ea58" to="#059a35" />
          {/* LinearGradient - lgSpouse - Yellow gradient */}
          <LinearGradient id="lgSpouse" from="#f3f3a7" to="#ffff00" />
          <rect width={width} height={height} rx={0} fill="#272b4d" />
          <Group top={margin.top} left={margin.left}>
            <Tree
              root={hierarchy(data, d => (d.isExpanded ? null : d.children))}
              size={[sizeWidth, sizeHeight]}
              separation={(a, b) =>
                (a.parent === b.parent ? 0.5 : 0.75) / a.depth
              }
            >
              {data => (
                <Group top={origin.y} left={origin.x}>
                  {data.links().map((link, i) => {
                    if (link.target.data.hasParnter) {
                      partners.push(link.target)
                    }
                    /* Do not show the link from root empty object */
                    if (link.source.depth === 0) {
                      return null
                    }
                    if (link.target.data.noParent === true) {
                      return null
                    }

                    return (
                      <LinkComponent
                        data={link}
                        percent={+stepPercent}
                        stroke="#374469"
                        strokeWidth="1"
                        fill="none"
                        key={i}
                        onClick={data => event => {
                          console.log(data)
                        }}
                      />
                    )
                  })}
                  {/* Draw Partners Line */}
                  {data.links().map((link, i) => {
                    if (typeof link.target.data.partnerId !== 'number') {
                      return null
                    }
                    const nodePartnerId = link.target.data.partnerId

                    const linkSource = partners.filter(partner => {
                      return partner.data.id === nodePartnerId ? partner : null
                    })

                    link.source = linkSource[0]

                    return link.source !== undefined ? (
                      <LinkComponent
                        data={link}
                        percent={+stepPercent}
                        stroke="#374469"
                        strokeWidth="1"
                        fill="none"
                        key={i}
                        onClick={data => event => {
                          console.log(data)
                        }}
                      />
                    ) : null
                  })}

                  {data.descendants().map((node, key) => {
                    /* Do not show the empty root object */
                    if (node.depth === 0) {
                      return null
                    }
                    const gender = node.data.gender
                    const isFemale = gender === 'Female' ? true : false
                    const name = node.data.name || ''
                    const nameLength = name.length * 4

                    let top
                    let left
                    if (layout === 'polar') {
                      const [radialX, radialY] = pointRadial(node.x, node.y)
                      top = radialY
                      left = radialX
                    } else {
                      if (orientation === 'vertical') {
                        top = node.y
                        left = node.x
                      } else {
                        top = node.x
                        left = node.y
                      }
                    }
                    const isSource = node.data.isSource
                    const imageId = 'image_' + key
                    const imageUrl = node.data.imageUrl
                    const hasImage = imageUrl !== undefined && imageUrl !== ''
                    return (
                      <Group
                        top={top}
                        left={left}
                        key={key}
                        className="node-group"
                        onClick={() => {
                          node.data.isExpanded = !node.data.isExpanded
                          console.log(node)
                          this.forceUpdate()
                        }}
                      >
                        {hasImage === true && imageUrl !== '' && (
                          <defs>
                            <pattern
                              id={imageId}
                              x={circleRadius}
                              y={circleRadius}
                              patternUnits="userSpaceOnUse"
                              height={circleDiameter}
                              width={circleDiameter}
                            >
                              <image x="0" y="0" xlinkHref={imageUrl} />
                            </pattern>
                          </defs>
                        )}
                        <circle
                          r={circleRadius}
                          fill={
                            hasImage
                              ? "url('#" + imageId + "')"
                              : isSource
                              ? isFemale
                                ? "url('#lgFemale')"
                                : "url('#lgMale')"
                              : node.data.isPartner !== true
                              ? '#272b4d'
                              : "url('#lgSpouse')"
                          }
                          className={
                            !isSource
                              ? 'node ' + (isFemale ? 'female' : 'male')
                              : ''
                          }
                          strokeWidth={1}
                          strokeDasharray={
                            !node.data.children && !node.data.hasParnter
                              ? '2,2'
                              : '0'
                          }
                          strokeOpacity={1}
                        />
                        )}
                        <rect
                          y={-nameLineHeight + fontSize / 2}
                          x={-nameLength}
                          height={fontSize * 2}
                          width={nameLength * 2}
                          className="node-text-bg"
                          rx="5"
                        />
                        <text
                          dy={circleRadius - fontSize}
                          fontSize={fontSize}
                          fontFamily="Arial"
                          textAnchor={'middle'}
                          style={{ pointerEvents: 'none' }}
                          className="node"
                        >
                          {name}
                        </text>
                      </Group>
                    )
                  })}
                </Group>
              )}
            </Tree>
          </Group>
        </svg>
      </div>
    )
  }
}
