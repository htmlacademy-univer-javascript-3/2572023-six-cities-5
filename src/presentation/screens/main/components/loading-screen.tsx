import {memo} from 'react';

function LoadingScreen() {
  return (
    <div style={
      {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }
    }
    >
      <div>
        <h1>Loading</h1>
      </div>
    </div>
  );
}

const MemoizedLoadingScreen = memo(LoadingScreen);
export default MemoizedLoadingScreen;
