
/********************\
 * Data             *
\********************/

/**
 * Data #1
 * digit -> bar-sequences
 */  
const dig2bars =
  [ [3,2,1,1]
  , [2,2,2,1]
  , [2,1,2,2]
  , [1,4,1,1]
  , [1,1,3,2]
  , [1,2,3,1]
  , [1,1,1,4]
  , [1,3,1,2]
  , [1,2,1,3]
  , [3,1,1,2]
  ]
;

/**
 * Data #2
 * first-digit -> reversed?
 */
const rpat =
  [ [0,0,0,0,0,0]
  , [0,0,1,0,1,1]
  , [0,0,1,1,0,1]
  , [0,0,1,1,1,0]
  , [0,1,0,0,1,1]
  , [0,1,1,0,0,1]
  , [0,1,1,1,0,0]
  , [0,1,0,1,0,1]
  , [0,1,0,1,1,0]
  , [0,1,1,0,1,0]
  ]
;

/**
 * Data #3
 * pos -> pad-bars
 */
const pad = 
  { start  : [1,1,1]
  , mid    : [1,1,1,1,1]
  , end    : [1,1,1]
  }
;
  
/**
 * Data #4
 * digit -> reversed-bar-sequences
 */ 
const dig2bars_ = digit2bars.map (xs => xs.slice(0).reverse() );


/********************\
 * ean2bars         *
\********************/

const ean2bars = ( d0, ds ) => 
  [ ...pad.start
  , ...ds.slice( 0, 5 ).map
    ( ( di, i ) => [ dig2bars, dig2bars_ ][ rpat[ d0 ][ i ] ][ di ]
    )
  , ...pad.mid
  , ...ds.slice( 5, 11 ).map
    ( ( d ) => dig2bars[ d ]
    )
  , ...pad.end
  ] 
;


/********************\
 * ean_valid        *
\********************/


// helpers
const plus = ( y ) => ( x ) => x+y;
const even = ( n ) => n%2 === 0;

// <digits> -> <bool>
const ean_valid = ( xs ) => 
  xs
    .map( ( x, i ) => ( even( x )? 1: 3 ) * x  )
    .reduce( plus, 0 );



/********************\
 * bars2html        *
\********************/

