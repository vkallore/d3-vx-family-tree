var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  },
  width = 840,
  height = 600

var kx = function(d) {
  return d.x - 20
}

var ky = function(d) {
  return d.y - 10
}

// This places the text x axis adjust this to center align the text
var tx = function(d) {
  return d.x - d.name.length - 10
}

// This places the text y axis adjust this to center align the text
var ty = function(d) {
  return d.y + 3
}

var marginSideWidth = margin.left + margin.right,
  marginSideHeight = margin.top + margin.bottom,
  svgWidth = width + marginSideWidth,
  svgHeight = height + 2 * marginSideHeight

// Make the SVG
var svg = d3
  .select('#graph')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + 2 * margin.top + ')')

// Background Gradient
svg
  .append('rect')
  .attr('id', 'main-bg')
  .attr(
    'transform',
    'translate(-' + 4 * margin.left + ',-' + 4 * margin.top + ')'
  )
  .attr('width', svgWidth + 2 * marginSideWidth)
  .attr('height', svgHeight + 2 * marginSideHeight)

// no_parent: true - Ensures that the node will not be linked to its parent
// hidden: true - Ensures that the nodes is not visible.
var root = {
  name: 'J A',
  id: 100,
  no_parent: true,
  children: [
    {
      name: 'P A',
      id: 1,
      is_root_user: true
    },
    {
      name: '',
      id: 2,
      no_parent: true,
      hidden: true,
      children: [
        {
          name: 'B K',
          id: 4
        },
        {
          name: '',
          id: 5,
          no_parent: true,
          hidden: true,
          children: [
            { name: 'D MM', id: 641, gender: 'Female' },
            { name: 'B MM', id: 642 }
          ]
        },
        {
          name: 'D MM',
          id: 6,
          gender: 'Female',
          no_parent: true
        },
        {
          name: 'V PK',
          id: 7,
          gender: 'Female'
        },
        {
          name: '',
          id: 8,
          no_parent: true,
          hidden: true,

          children: [
            {
              name: 'S PK',
              id: 10,
              gender: 'Female'
            },
            {
              name: 'Sk PK',
              id: 11
            },
            {
              name: 'Sj PK',
              id: 12
            },
            {
              name: 'Sk PK',
              id: 13
            }
          ]
        },
        {
          name: 'EK T N',
          id: 9,
          no_parent: true
        },
        {
          name: 'V K',
          id: 14
        },
        {
          name: '',
          id: 15,
          no_parent: true,
          hidden: true,
          children: [
            {
              name: 'V K',
              id: 17
            },
            {
              name: 'V KV',
              id: 18
            }
          ]
        },
        {
          name: 'M PG',
          id: 16,
          gender: 'Female',
          no_parent: true
        },
        {
          name: 'R PK',
          id: 19
        },
        {
          name: '',
          id: 20,
          no_parent: true,
          hidden: true,
          children: [
            {
              name: 'A R',
              id: 22,
              gender: 'Female'
            },
            {
              name: 'C K',
              id: 23
            }
          ]
        },
        {
          name: 'S VV',
          id: 21,
          no_parent: true,
          gender: 'Female'
        }
      ]
    },
    {
      name: 'MK N A',
      id: 3,
      no_parent: true
    }
  ]
}

var allNodes = flatten(root)
// This maps the spouses together mapping uses the ID
var spouses = [
  {
    source: {
      id: 1,
      name: ''
    },
    target: {
      id: 3,
      name: ''
    }
  },
  {
    source: {
      id: 4,
      name: ''
    },
    target: {
      id: 6,
      name: ''
    }
  },
  {
    source: {
      id: 7,
      name: ''
    },
    target: {
      id: 9,
      name: ''
    }
  },
  {
    source: {
      id: 14,
      name: ''
    },
    target: {
      id: 16,
      name: ''
    }
  },
  {
    source: {
      id: 19,
      name: ''
    },
    target: {
      id: 21,
      name: ''
    }
  }
]

// Compute the layout.
var tree = d3.layout.tree().size([width, height]),
  nodes = tree.nodes(root),
  links = tree.links(nodes)

// Create the svg:defs element and the main gradient definition.
var svgDefs = svg.append('defs')

var rootUserGradient = svgDefs.append('linearGradient').attr('id', 'lgRootUser')

// Create the stops of the main gradient. Each stop will be assigned
// a class to style the stop using CSS.
rootUserGradient
  .append('stop')
  .attr('class', 'stop-left')
  .attr('offset', '0')

rootUserGradient
  .append('stop')
  .attr('class', 'stop-right')
  .attr('offset', '1')

// Create the link lines.
svg
  .selectAll('.link')
  .data(links)
  .enter()
  .append('path')
  .attr('class', 'link')
  .attr('d', elbow)

var nodes = svg
  .selectAll('.node')
  .data(nodes)
  .enter()

// Draw spouse line with 'spouse' class
svg
  .selectAll('.spouse')
  .data(spouses)
  .enter()
  .append('path')
  .attr('class', 'spouse')
  .attr('d', spouseLine)

// Create the node rectangles.
nodes
  .append('rect')
  .attr('class', function(d) {
    return d.is_root_user !== true
      ? 'node ' + (d.gender === 'Female' ? 'female' : 'male')
      : ''
  })
  .attr('fill', function(d) {
    return d.is_root_user !== true ? '' : "url('#lgRootUser')"
  })
  .attr('height', 20)
  .attr('width', 40)
  .attr('id', function(d) {
    return d.id
  })
  .attr('display', function(d) {
    if (d.hidden) {
      return 'none'
    } else {
      return ''
    }
  })
  .attr('x', kx)
  .attr('y', ky)

// Create the node text label.
nodes
  .append('text')
  .text(function(d) {
    return d.name
  })
  .attr('class', function(d) {
    return d.is_root_user !== true ? 'member-name' : 'source-name'
  })
  .attr('x', tx)
  .attr('y', ty)

/**
 * Defines the line between spouses.
 **/
function spouseLine(d, i) {
  // Start point
  var start = allNodes.filter(function(v) {
    if (d.source.id == v.id) {
      return true
    } else {
      return false
    }
  })
  // End point
  var end = allNodes.filter(function(v) {
    if (d.target.id == v.id) {
      return true
    } else {
      return false
    }
  })
  // Define the start coordinate and end coordinate
  var linedata = [
    {
      x: start[0].x,
      y: start[0].y
    },
    {
      x: end[0].x,
      y: end[0].y
    }
  ]
  var fun = d3.svg
    .line()
    .x(function(d) {
      return d.x
    })
    .y(function(d) {
      return d.y
    })
    .interpolate('linear')
  return fun(linedata)
}

/**
 * To make the nodes in flat mode.
 * This gets all the nodes in same level
 */
function flatten(root) {
  var n = [],
    i = 0

  function recurse(node) {
    if (node.children) node.children.forEach(recurse)
    if (!node.id) node.id = ++i
    n.push(node)
  }
  recurse(root)
  return n
}

/**
 * This draws the lines between nodes.
 **/
function elbow(d, i) {
  if (d.target.no_parent) {
    return 'M0,0L0,0'
  }
  var diff = d.source.y - d.target.y
  // Defines the point from where you need the line to break out change
  var ny = d.target.y + diff * 0.5

  linedata = [
    {
      x: d.target.x,
      y: d.target.y
    },
    {
      x: d.target.x,
      y: ny
    },
    {
      x: d.source.x,
      y: d.source.y
    }
  ]

  var fun = d3.svg
    .line()
    .x(function(d) {
      return d.x
    })
    .y(function(d) {
      return d.y
    })
    .interpolate('step-after')
  return fun(linedata)
}
