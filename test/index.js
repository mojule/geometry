'use strict'

const assert = require( 'assert' )

const pointFns = require( '../dist/point' )
const lineFns = require( '../dist/line' )
const { is } = require( '../dist/util' )

const {
  addPoint, subtractPoint, multiplyPoint, assertPoint, clonePoint, point,
  emptyPoint, pointFromArray, pointFromString
} = pointFns

const {
  intersection, assertLine, line, lineFromPoints, emptyLine, cloneLine,
  lineFromArray, lineFromString
} = lineFns

describe( 'geometry', () => {
  describe( 'point', () => {
    it( 'addPoint', () => {
      const p1 = { x: 1, y: 2 }
      const p2 = addPoint( p1, { x: 2, y: 3 } )
      const p3 = addPoint( p1, { x: 2 } )
      const p4 = addPoint( p1, { y: 3 } )

      assert.deepEqual( p2, { x: 3, y: 5 } )
      assert.deepEqual( p3, { x: 3, y: 2 } )
      assert.deepEqual( p4, { x: 1, y: 5 } )
    })

    it( 'subtractPoint', () => {
      const p1 = { x: 1, y: 2 }
      const p2 = subtractPoint( p1, { x: 2, y: 3 } )
      const p3 = subtractPoint( p1, { x: 2 } )
      const p4 = subtractPoint( p1, { y: 3 } )

      assert.deepEqual( p2, { x: -1, y: -1 } )
      assert.deepEqual( p3, { x: -1, y: 2 } )
      assert.deepEqual( p4, { x: 1, y: -1 } )
    })

    it( 'multiplyPoint', () => {
      const p1 = { x: 1, y: 2 }
      const p2 = multiplyPoint( p1, { x: 2, y: 3 } )
      const p3 = multiplyPoint( p1, { x: 2 } )
      const p4 = multiplyPoint( p1, { y: 3 } )

      assert.deepEqual( p2, { x: 2, y: 6 } )
      assert.deepEqual( p3, { x: 2, y: 0 } )
      assert.deepEqual( p4, { x: 0, y: 6 } )
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
  })

  describe( 'line', () => {
    it( 'intersection', () => {
      const l1 = [ { x: 1, y: 0 }, { x: 1, y: 2 } ]
      const l2 = [ { x: 0, y: 1 }, { x: 2, y: 1 } ]
      const l3 = [ { x: 0, y: 2 }, { x: 2, y: 2 } ]

      const p1 = intersection( l1, l2 )
      const p2 = intersection( l2, l3 )

      assert.deepEqual( p1, { x: 1, y: 1 } )
      assert.strictEqual( p2, undefined )
    })

    it( 'assertLine', () => {
      const l1 = [ { x: 1, y: 0 }, { x: 1, y: 2 } ]

      assert.throws( () => assertLine() )
      assert.doesNotThrow( () => assertLine( l1 ) )
    })

    it( 'line', () => {
      const l1 = line( 1, 0, 1, 2 )
      const l2 = line( '1', '0', '1', '2' )
      const l3 = line()

      const expect = [ { x: 1, y: 0 }, { x: 1, y: 2 } ]
      const expectEmpty = [ { x: 0, y: 0 }, { x: 0, y: 0 } ]

      assert.deepEqual( l1, expect )
      assert.deepEqual( l2, expect )
      assert.deepEqual( l3, expectEmpty )
    })

    it( 'lineFromPoints', () => {
      const l1 = lineFromPoints( point( 1, 0 ), point( 1, 2 ) )

      const expect = [ { x: 1, y: 0 }, { x: 1, y: 2 } ]

      assert.deepEqual( l1, expect )
    })

    it( 'emptyLine', () => {
      const expectEmpty = [ { x: 0, y: 0 }, { x: 0, y: 0 } ]

      assert.deepEqual( emptyLine(), expectEmpty )
    })

    it( 'cloneLine', () => {
      const p1 = point( 1, 0 )
      const p2 = point( 1, 2 )

      const l1 = lineFromPoints( p1, p2 )
      const l2 = cloneLine( l1 )

      const [ p3, p4 ] = l2

      assert.notStrictEqual( l1, l2 )
      assert.notStrictEqual( p1, p3 )
      assert.notStrictEqual( p2, p4 )
    })

    it( 'lineFromArray', () => {
      const l1 = lineFromArray( [ 1, 0, 1, 2 ] )
      const l2 = lineFromArray( [ '1', '0', '1', '2' ] )

      const expect = [ { x: 1, y: 0 }, { x: 1, y: 2 } ]

      assert.deepEqual( l1, expect )
      assert.deepEqual( l2, expect )
    })

    it( 'lineFromString', () => {
      const str = '1,0 1,2'
      const l1 = lineFromString( str )

      const expect = [ { x: 1, y: 0 }, { x: 1, y: 2 } ]

      assert.deepEqual( l1, expect )
    })
  })
})