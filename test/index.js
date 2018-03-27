'use strict'

const assert = require( 'assert' )
const geometry = require( '../dist' )

const { line, point, size, util } = geometry

const {
  approximatelyEqual, radiansToDegrees, degreesToRadians, alignCenter
} = util

describe( 'geometry', () => {
  describe( 'utils', () => {
    it( 'approximatelyEqual', () => {
      assert( approximatelyEqual( 0.00000001, 0.00000002 ) )
      assert( approximatelyEqual( 0.1, 0.2, 0.1 ) )
      assert( !approximatelyEqual( 0.1, 0.2, 0.01 ) )
    })

    it( 'radiansToDegrees', () => {
      const degrees = radiansToDegrees( Math.PI )

      assert.strictEqual( degrees, 180 )
    })

    it( 'degreesToRadians', () => {
      const radians = degreesToRadians( 180 )

      assert.strictEqual( radians, Math.PI )
    })

    it( 'alignCenter', () => {
      const center = alignCenter( 10, 6 )

      assert.strictEqual( center, 2 )
    })
  })

  describe( 'line', () => {
    const {
      intersection, lineVector, midLine, length, unitVector, angle,
      bresenhamLine
    } = line

    it( 'intersection', () => {
      const [ x, y ] = intersection( 1, 0, 1, 2, 0, 1, 2, 1 )

      assert.strictEqual( x, 1 )
      assert.strictEqual( y, 1 )

      const none = intersection( 0, 0, 2, 0, 0, 2, 2, 2 )

      assert.strictEqual( none, undefined )
    })

    it( 'lineVector', () => {
      const [ x, y ] = lineVector( 1, 1, 2, 2 )

      assert.strictEqual( x, 1 )
      assert.strictEqual( y, 1 )
    })

    it( 'midLine', () => {
      const [ x, y ] = midLine( 0, 0, 2, 2 )

      assert.strictEqual( x, 1 )
      assert.strictEqual( y, 1 )
    })

    it( 'length', () => {
      const l = length( 0, 0, 1, 0 )

      assert.strictEqual( l, 1 )
    })

    it( 'unitVector', () => {
      const [ x, y ] = unitVector( 1, 1, 3, 3 )
      const len = length( 0, 0, x, y )

      assert( approximatelyEqual( len, 1 ) )
    })

    it( 'angle', () => {
      const a = angle( 0, 0, 1, 1 )

      assert.strictEqual( a, 45 )
    })

    it( 'bresenhamLine', () => {
      const l1 = bresenhamLine( 0, 0, 2, 2 )
      const l2 = bresenhamLine( 2, 2, 0, 0 )
      const l3 = bresenhamLine( 0, 0, 1, 2 )
      const l4 = bresenhamLine( 0, 0, 2, 1 )

      assert.deepEqual( l1, [ 0, 0, 1, 1, 2, 2 ] )
      assert.deepEqual( l2, [ 2, 2, 1, 1, 0, 0 ] )
      assert.deepEqual( l3, [ 0, 0, 0, 1, 1, 2 ] )
      assert.deepEqual( l4, [ 0, 0, 1, 0, 2, 1 ] )
    })
  })

  describe( 'point', () => {
    const { translate, scale, rotate, vector } = point

    it( 'translate', () => {
      const [ x1, y1 ] = translate( 0, 1, 2 )
      const [ x2, y2 ] = translate( 0, 1, 2, 3 )

      assert.strictEqual( x1, 2 )
      assert.strictEqual( y1, 3 )
      assert.strictEqual( x2, 2 )
      assert.strictEqual( y2, 4 )
    })

    it( 'scale', () => {
      const [ x1, y1 ] = scale( 1, 2, 3 )
      const [ x2, y2 ] = scale( 1, 2, 3, 4 )

      assert.strictEqual( x1, 3 )
      assert.strictEqual( y1, 6 )
      assert.strictEqual( x2, 3 )
      assert.strictEqual( y2, 8 )
    })

    it( 'rotate', () => {
      const [ x1, y1 ] = rotate( 1, 0, 90 )
      const [ x2, y2 ] = rotate( 2, 1, 90, 1, 1 )

      assert( approximatelyEqual( x1, 0 ) )
      assert( approximatelyEqual( y1, 1 ) )
      assert( approximatelyEqual( x2, 1 ) )
      assert( approximatelyEqual( y2, 2 ) )
    })

    it( 'vector', () => {
      const [ x1, y1 ] = vector( 90, 1 )

      assert( approximatelyEqual( x1, 0 ) )
      assert( approximatelyEqual( y1, 1 ) )
    })
  })

  describe( 'size', () => {
    const { rectSize, scaleSizeInSize } = size

    it( 'rectSize', () => {
      const [ w1, h1 ] = rectSize( 1, 3, 5, 9 )
      const [ w2, h2 ] = rectSize( 9, 5, 3, 1 )

      assert.strictEqual( w1, 4 )
      assert.strictEqual( h1, 6 )
      assert.strictEqual( w2, 6 )
      assert.strictEqual( h2, 4 )
    })

    it( 'scaleSize', () => {
      const w1 = 4
      const h1 = 2
      const w2 = 2
      const h2 = 2

      assert.strictEqual( scaleSizeInSize( w1, h1, w2, h2 ), 1 )
      assert.strictEqual( scaleSizeInSize( w2, h2, w1, h1 ), 0.5 )
    })
  })
})
