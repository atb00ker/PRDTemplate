import React from 'react';
import { IContentStateImages } from '../../types/ReactComponentInput';
import AuthBlockerImage from '../../assets/illustrations/website-auth-1.svg';
import Image from 'react-bootstrap/Image';

const AuthRequiredImage: React.FC<IContentStateImages> = ({ height, width, imgHeight }) => {
  return (
    <div className='text-center d-flex' style={{ height: height }}>
      <div className='text-center m-auto'>
        <Image
          style={{ maxHeight: imgHeight, width: width }}
          src={AuthBlockerImage}
          alt='Provide Credentials'
        />
      </div>
    </div>
  );
};

export { AuthRequiredImage };
