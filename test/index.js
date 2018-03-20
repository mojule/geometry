const assert = require( 'assert' )

const pointFns = require( '../dist/point' )
const lineFns = require( '../dist/line' )

const {
  addPoint, subtractPoint, multiplyPoint, assertPoint, clonePoint, point,
  emptyPoint, pointFromArray, pointFromString
} = pointFns

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
})