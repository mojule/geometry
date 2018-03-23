'use strict'

const assert = require( 'assert' )

const { is } = require( '../dist/util' )

const Point = require( '../dist/point' )
const Line = require( '../dist/line' )
const Rect = require( '../dist/rect' )
const Size = require( '../dist/size' )

const {
  translatePoint, scalePoint, assertPoint, clonePoint, point, emptyPoint,
  pointFromArray, pointFromString, pointFromSize, pointToEdges, pointFromEdges,
  vector, rotatePoint, rotateAround
} = Point

const {
  intersection, assertLine, line, lineFromPoints, emptyLine, cloneLine,
  lineFromArray, lineFromString, lineFromValues, lineFromPoint, lineFromSize,
  lineFromRect
} = Line

describe( 'geometry', () => {
  describe( 'point', () => {
    it( 'translate', () => {
      const p1 = { x: 1, y: 2 }
      const p2 = translatePoint( p1, { x: 2, y: 3 } )
      const p3 = translatePoint( p1, { x: 2 } )
      const p4 = translatePoint( p1, { y: 3 } )

      assert.deepEqual( p2, { x: 3, y: 5 } )
      assert.deepEqual( p3, { x: 3, y: 2 } )
      assert.deepEqual( p4, { x: 1, y: 5 } )
    })

    it( 'scale', () => {
      const p1 = { x: 1, y: 2 }
      const p2 = scalePoint( p1, { x: 2, y: 3 } )
      const p3 = scalePoint( p1, { x: 2 } )
      const p4 = scalePoint( p1, { y: 3 } )
      const p5 = scalePoint( p1, 2 )

      assert.deepEqual( p2, { x: 2, y: 6 } )
      assert.deepEqual( p3, { x: 2, y: 2 } )
      assert.deepEqual( p4, { x: 1, y: 6 } )
      assert.deepEqual( p5, { x: 2, y: 4 } )
    })

    it( 'rotatePoint', () => {
      const p = { x: 1, y: 2 }
      const angle = 90

      const expect = { x: -2, y: 1 }
      const result = rotatePoint( p, angle )

      let { x, y } = result

      x = Math.round( x )
      y = Math.round( y )

      assert.deepEqual( { x, y }, expect )
    })

    it( 'rotateAround', () => {
      const p = { x: 1, y: 0 }
      const origin = { x: 1, y: 1 }
      const angle = 90
      const result = rotateAround( p, origin, angle )

      const expect = { x: 2, y: 1 }

      let { x, y } = result

      x = Math.round( x )
      y = Math.round( y )

      assert.deepEqual( { x, y }, expect )
    })

    it( 'assertPoint', () => {
      assert.throws( () => assertPoint() )
      assert.doesNotThrow( () => assertPoint( { x: 1, y: 2 } ) )
    })

    it( 'clonePoint', () => {
      const p1 = { x: 1, y: 2 }
      const p2 = clonePoint( p1 )

      assert.notStrictEqual( p1, p2 )
      assert.deepEqual( p2, p1 )
    })

    it( 'point', () => {
      const p1 = point()
      const p2 = point( 1, 2 )
      const p3 = point( '1', '2' )

      assert.deepEqual( p1, { x: 0, y: 0 } )
      assert.deepEqual( p2, { x: 1, y: 2 } )
      assert.deepEqual( p3, { x: 1, y: 2 } )
    })

    it( 'emptyPoint', () => {
      const p = emptyPoint()

      assert.deepEqual( p, { x: 0, y: 0 } )
    })

    it( 'pointFromArray', () => {
      const p1 = pointFromArray( [] )
      const p2 = pointFromArray( [ 1, 2 ] )
      const p3 = pointFromArray( [ '1', '2' ] )

      assert.deepEqual( p1, { x: 0, y: 0 } )
      assert.deepEqual( p2, { x: 1, y: 2 } )
      assert.deepEqual( p3, { x: 1, y: 2 } )
    })

    it( 'pointFromString', () => {
      const p1 = pointFromString( '1 2' )
      const p2 = pointFromString( '1,2' )
      const p3 = pointFromString( ' 1 , 2 ' )

      assert.deepEqual( p1, { x: 1, y: 2 } )
      assert.deepEqual( p2, { x: 1, y: 2 } )
      assert.deepEqual( p3, { x: 1, y: 2 } )
    })

    it( 'pointFromSize', () => {
      const s = { width: 1, height: 2 }

      const p = pointFromSize( s )

      assert.deepEqual( p, { x: 1, y: 2 } )
    })

    it( 'pointToEdges', () => {
      const p = { x: 1, y: 0 }

      const e = pointToEdges( p )

      assert.deepEqual( e, { top: 0, left: 1 } )
    })

    it( 'pointFromEdges', () => {
      const e = { top: 0, left: 1 }

      const p = pointFromEdges( e )

      assert.deepEqual( p, { x: 1, y: 0 } )
    })

    it( 'vector', () => {
      const l = { start: { x: 1, y: 2 }, end: { x: 2, y: 4 } }

      const v = vector( l )

      assert.deepEqual( v, { x: 1, y: 2 } )
    })
  })

  describe( 'line', () => {
    it( 'intersection', () => {
      const l1 = line( { x: 1, y: 0 }, { x: 1, y: 2 } )
      const l2 = line( { x: 0, y: 1 }, { x: 2, y: 1 } )
      const l3 = line( { x: 0, y: 2 }, { x: 2, y: 2 } )

      const p1 = intersection( l1, l2 )
      const p2 = intersection( l2, l3 )

      assert.deepEqual( p1, { x: 1, y: 1 } )
      assert.strictEqual( p2, undefined )
    })

    it( 'assertLine', () => {
      const l1 = line( { x: 1, y: 0 }, { x: 1, y: 2 } )

      assert.throws( () => assertLine() )
      assert.doesNotThrow( () => assertLine( l1 ) )
    })

    it( 'lineFromValues', () => {
      const l1 = lineFromValues( 1, 0, 1, 2 )
      const l2 = lineFromValues( '1', '0', '1', '2' )
      const l3 = lineFromValues()

      const expect = { start: { x: 1, y: 0 }, end: { x: 1, y: 2 } }
      const expectEmpty = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }

      assert.deepEqual( l1, expect )
      assert.deepEqual( l2, expect )
      assert.deepEqual( l3, expectEmpty )
    })

    it( 'line', () => {
      const l1 = line( point( 1, 0 ), point( 1, 2 ) )

      const expect = { start: { x: 1, y: 0 }, end: { x: 1, y: 2 } }

      assert.deepEqual( l1, expect )
    })

    it( 'emptyLine', () => {
      const expectEmpty = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }

      assert.deepEqual( emptyLine(), expectEmpty )
    })

    it( 'cloneLine', () => {
      const p1 = point( 1, 0 )
      const p2 = point( 1, 2 )

      const l1 = line( p1, p2 )
      const l2 = cloneLine( l1 )

      const { start, end } = l2

      assert.notStrictEqual( l1, l2 )
      assert.notStrictEqual( p1, start )
      assert.notStrictEqual( p2, end )
    })

    it( 'lineFromArray', () => {
      const l1 = lineFromArray( [ 1, 0, 1, 2 ] )
      const l2 = lineFromArray( [ '1', '0', '1', '2' ] )

      const expect = { start: { x: 1, y: 0 }, end: { x: 1, y: 2 } }

      assert.deepEqual( l1, expect )
      assert.deepEqual( l2, expect )
    })

    it( 'lineFromString', () => {
      const str = '1,0 1,2'
      const l1 = lineFromString( str )

      const expect = { start: { x: 1, y: 0 }, end: { x: 1, y: 2 } }

      assert.deepEqual( l1, expect )
    })

    it( 'lineFromPoint', () => {
      const p = { x: 1, y: 2 }

      const expect = { start: { x: 0, y: 0 }, end: { x: 1, y: 2 } }

      assert.deepEqual( lineFromPoint( p ), expect )
    })

    it( 'lineFromSize', () => {
      const s = { width: 1, height: 2 }

      const expect = { start: { x: 0, y: 0 }, end: { x: 1, y: 2 } }

      assert.deepEqual( lineFromSize( s ), expect )
    })

    it( 'lineFromRect', () => {
      const r = { x: 1, y: 2, width: 2, height: 3 }

      const expect = { start: { x: 1, y: 2 }, end: { x: 3, y: 5 } }

      assert.deepEqual( lineFromRect( r ), expect )
    })
  })
})