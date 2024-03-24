import styles from './MyProjects.module.scss'
import SearchInput from '../../UI/SearchInput/searchInput'
import { useSearch } from '../../hooks/useSearch';
import { getIconKey } from '../../helpers/getImageKey';
import { Link } from 'react-router-dom';
import { useGetMyProjectsQuery } from '../../store/portfolio/PortfolioSlice';
import Skeleton from '../../UI/skeleton/Skeleton';
const MyProjects = () => {
  const {data:myProjects,isLoading,isError} = useGetMyProjectsQuery()
  const { searchText, searchHandle, searchSubmit } = useSearch();
  const handleDelete = () => {
    console.log('delete');
  }
  if (isLoading || isError) {
    return <div className={styles.myProjects__container}>
      <Skeleton size={{width:'100%',height:'100vh'  }} />
    </div>
  }
  console.log(myProjects);
  return <div className={styles.myProjects__container}>
    {
      myProjects.length !== 0 ? (
        <>
          <div className={styles.myProjects__search}>
      <SearchInput
        searchHandle={searchHandle}
        searchText={searchText}
        searchSubmit={searchSubmit}
      />
    </div>
    <ul className={styles.playlist__list}>
      <li className={styles['playlist__list-item']}>
        <div className={`${styles['playlist__list-bg']} ${styles['playlist__list--add']}`}>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M32.4175 32.1928V1.62268H37.6783V32.1928H68.9013V37.3951H37.6783V68.2712H32.4175V37.3951H1.46875V32.1928H32.4175Z" fill="#8F8F8F" stroke="#8F8F8F" strokeWidth="1.5625" strokeMiterlimit="2" strokeLinejoin="round"/>
          </svg>
        </div>
        <h5 className={styles.playlist__subtitle}>Добавить подборку</h5>
      </li>
      <li className={styles['playlist__list-item']}>
        <div className={styles['playlist__list-bg']}>
          <img src={'https://10.img.avito.st/image/1/1.h944FLa1KzcutJE3Oiq8j0q2KTeGv4k2NrUpNQ.7OmD2xoaLtdE_lKyrHNX39oy88oPYlaUo6Tzjur7cIA'} alt="img playlist top" />
        </div>
        <h5 className={styles.playlist__subtitle}>Белый кирпич</h5>
        <div className={styles['playlist__list-count']}>
          <img src={getIconKey('CountIcon')} alt="count playlist icon" />
          <span>4 шт</span>
        </div>
      </li>
      <li className={styles['playlist__list-item']}>
        <div className={styles['playlist__list-bg']}>
          <img src={'https://10.img.avito.st/image/1/1.h944FLa1KzcutJE3Oiq8j0q2KTeGv4k2NrUpNQ.7OmD2xoaLtdE_lKyrHNX39oy88oPYlaUo6Tzjur7cIA'} alt="img playlist top" />
        </div>
        <h5 className={styles.playlist__subtitle}>Красный кирпич</h5>
        <div className={styles['playlist__list-count']}>
          <img src={getIconKey('CountIcon')} alt="count playlist icon" />
          <span>21 шт</span>
        </div>
      </li>
      <li className={styles['playlist__list-item']}>
        <div className={styles['playlist__list-bg']}>
          <img src={'https://10.img.avito.st/image/1/1.h944FLa1KzcutJE3Oiq8j0q2KTeGv4k2NrUpNQ.7OmD2xoaLtdE_lKyrHNX39oy88oPYlaUo6Tzjur7cIA'} alt="img playlist top" />
        </div>
        <h5 className={styles.playlist__subtitle}>Красный кирпич</h5>
        <div className={styles['playlist__list-count']}>
          <img src={getIconKey('CountIcon')} alt="count playlist icon" />
          <span>312 шт</span>
        </div>
      </li>
    </ul>
    <div className={styles.myProjects__delimiter}>
      <ul className={styles.myProjects__list}>
        {
          myProjects.map((project) => (
            <li key={project.id} className={styles['myProjects__list-item']}>
          <h2 className={styles['myProjects__list-title']}>{project.title}</h2>
          <img className={styles['myProjects__list-image']} src={'https://get.wallhere.com/photo/pattern-glass-rectangular-1296833.jpg'} alt="bg my projects"/>
          <div className={styles['myProjects__list-bottom']}>
            <p>{project.date_work}</p>
            <div className={ styles['myProjects__list-share'] }>
              <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39 0H0V39H39V0Z" fill="white" fillOpacity="0.01"/>
                <path d="M28.4375 13C30.6811 13 32.5 11.1811 32.5 8.9375C32.5 6.69385 30.6811 4.875 28.4375 4.875C26.1939 4.875 24.375 6.69385 24.375 8.9375C24.375 11.1811 26.1939 13 28.4375 13Z" fill="white" stroke="black" strokeWidth="1.92" strokeLinejoin="round"/>
                <path d="M10.5625 23.5625C12.8061 23.5625 14.625 21.7436 14.625 19.5C14.625 17.2564 12.8061 15.4375 10.5625 15.4375C8.31886 15.4375 6.5 17.2564 6.5 19.5C6.5 21.7436 8.31886 23.5625 10.5625 23.5625Z" fill="white" stroke="black" strokeWidth="1.92" strokeLinejoin="round"/>
                <path d="M24.375 11.0293L14.0879 17.2619" stroke="black" strokeWidth="1.92" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.0879 21.5831L24.927 27.9881" stroke="black" strokeWidth="1.92" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28.4375 26C30.6811 26 32.5 27.8189 32.5 30.0625C32.5 32.3061 30.6811 34.125 28.4375 34.125C26.1939 34.125 24.375 32.3061 24.375 30.0625C24.375 27.8189 26.1939 26 28.4375 26Z" fill="white" stroke="black" strokeWidth="1.92" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles['myProjects__list-options']}>
            <Link to='edit'>
              <div className={styles['myProjects__list-edit']}>
                <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.9421 1.38436C20.2191 1.05422 20.5585 0.781901 20.9409 0.582962C21.3232 0.384023 21.741 0.262361 22.1704 0.224925C22.5998 0.187489 23.0323 0.235014 23.4433 0.364784C23.8544 0.494554 24.2358 0.704026 24.5658 0.981236L25.8821 2.08561C26.5485 2.64489 26.9656 3.44597 27.0415 4.31269C27.1175 5.17941 26.8461 6.04082 26.2871 6.70749L15.5921 19.4537C14.8168 20.3781 13.8619 21.1352 12.7852 21.6794L7.96268 24.115C7.71708 24.2389 7.44052 24.2881 7.16724 24.2565C6.89397 24.2248 6.63598 24.1137 6.42523 23.9368C6.21449 23.76 6.06023 23.5253 5.98157 23.2617C5.9029 22.998 5.90329 22.7171 5.98268 22.4537L7.54455 17.2806C7.89296 16.1262 8.47216 15.0545 9.24705 14.1306L19.9421 1.38436ZM22.7583 3.13561C22.7112 3.09573 22.6567 3.06553 22.5979 3.04677C22.5391 3.02801 22.4772 3.02104 22.4157 3.02626C22.3542 3.03149 22.2943 3.04881 22.2395 3.07723C22.1848 3.10564 22.1361 3.1446 22.0964 3.19186L21.1027 4.37874L23.1314 6.09249L24.1327 4.89999C24.2124 4.80473 24.2511 4.68171 24.2402 4.55796C24.2293 4.4342 24.1697 4.31984 24.0746 4.23999L22.7564 3.13374L22.7583 3.13561ZM21.3239 8.24686L19.2952 6.53311L11.4014 15.9381C10.8713 16.5706 10.4752 17.3042 10.2371 18.0944L9.62393 20.125L11.5177 19.1687C12.2542 18.7965 12.9074 18.2785 13.4377 17.6462L21.3239 8.24686Z" fill="black" stroke="black" strokeWidth="0.000426667"/>
                  <path d="M4.59375 6.0625C4.22079 6.0625 3.8631 6.21066 3.59938 6.47438C3.33566 6.7381 3.1875 7.09579 3.1875 7.46875V25.2812C3.1875 26.0575 3.8175 26.6875 4.59375 26.6875H22.4063C22.7792 26.6875 23.1369 26.5393 23.4006 26.2756C23.6643 26.0119 23.8125 25.6542 23.8125 25.2812V16.375C23.8125 16.002 23.9607 15.6444 24.2244 15.3806C24.4881 15.1169 24.8458 14.9688 25.2188 14.9688C25.5917 14.9688 25.9494 15.1169 26.2131 15.3806C26.4768 15.6444 26.625 16.002 26.625 16.375V25.2812C26.625 26.4001 26.1805 27.4732 25.3894 28.2644C24.5982 29.0555 23.5251 29.5 22.4063 29.5H4.59375C3.47487 29.5 2.40181 29.0555 1.61064 28.2644C0.819474 27.4732 0.375 26.4001 0.375 25.2812V7.46875C0.375 6.34987 0.819474 5.27681 1.61064 4.48564C2.40181 3.69447 3.47487 3.25 4.59375 3.25H9.75C10.123 3.25 10.4806 3.39816 10.7444 3.66188C11.0081 3.9256 11.1563 4.28329 11.1563 4.65625C11.1563 5.02921 11.0081 5.3869 10.7444 5.65062C10.4806 5.91434 10.123 6.0625 9.75 6.0625H4.59375Z" fill="black" stroke="black" strokeWidth="0.000426667"/>
                </svg>
              </div>
            </Link>
            <div className={styles['myProjects__list-delete']} onClick={handleDelete}>
              <svg width="22" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3902 7.85168H2.46875V27.0429C2.46875 28.1995 3.41211 29.1347 4.57285 29.1347H17.3861C18.551 29.1347 19.4943 28.1995 19.4943 27.0429V7.85579H17.3902V7.85168Z" fill="white"/>
                <path d="M20.7732 5.10774C20.7732 4.7427 20.4615 4.44739 20.076 4.44739H1.88965C1.5041 4.44739 1.19238 4.7427 1.19238 5.10774V7.19543C1.19238 7.56047 1.5041 7.85579 1.88965 7.85579H20.076C20.4615 7.85579 20.7732 7.56047 20.7732 7.19543V5.10774Z" fill="white"/>
                <path d="M20.0764 3.59431H15.7V1.03904C15.7 0.567359 15.3186 0.185913 14.8469 0.185913H7.18926C6.71758 0.185913 6.33613 0.567359 6.33613 1.03904V3.59431H1.89004C1.03691 3.59431 0.34375 4.27107 0.34375 5.10369V7.19138C0.34375 7.93376 0.897461 8.549 1.61934 8.67615V27.0429C1.61934 28.6672 2.94414 29.9879 4.57656 29.9879H17.3898C19.0223 29.9879 20.3471 28.6672 20.3471 27.0429V8.67615C21.073 8.549 21.6227 7.93376 21.6227 7.19138V5.10369C21.6268 4.27517 20.9295 3.59431 20.0764 3.59431ZM8.03828 1.89216H13.9979V3.59431H8.03828V1.89216ZM2.0418 5.30056H19.9205V7.00271H2.0418V5.30056ZM18.6449 27.047C18.6449 27.732 18.083 28.2898 17.3898 28.2898H4.57656C3.8834 28.2898 3.32148 27.732 3.32148 27.047V8.70486H18.6449V27.047Z" fill="#211F1E"/>
                <path d="M10.9836 25.7674C11.4553 25.7674 11.8367 25.3859 11.8367 24.9143V12.1461C11.8367 11.6744 11.4553 11.293 10.9836 11.293C10.5119 11.293 10.1305 11.6744 10.1305 12.1461V24.9184C10.1305 25.3859 10.5119 25.7674 10.9836 25.7674ZM6.72617 25.7674C7.19785 25.7674 7.5793 25.3859 7.5793 24.9143V12.1461C7.5793 11.6744 7.19785 11.293 6.72617 11.293C6.25449 11.293 5.87305 11.6744 5.87305 12.1461V24.9184C5.87715 25.3859 6.25859 25.7674 6.72617 25.7674ZM15.241 25.7961C15.7127 25.7961 16.0941 25.4146 16.0941 24.943V12.1707C16.0941 11.699 15.7127 11.3176 15.241 11.3176C14.7693 11.3176 14.3879 11.699 14.3879 12.1707V24.943C14.3879 25.4146 14.7693 25.7961 15.241 25.7961Z" fill="#211F1E"/>
              </svg>
            </div>
          </div>
        </li>  
          ))        
        }
      </ul>
    </div>
        </>
      ):(<p className={styles.default__text}>нет проектов</p>)
    }
 </div>
}

export default MyProjects