import React, { useState } from "react";
import styles from './postCard.module.css';

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";

function PostCard({post}) {
    /*포스트 고유넘버를 서버에 보내서 로그인 한 유저가 해당 포스트에 (1) 투표를 했는지, (2) 했다면 몇번에 투표했는지 받기*/
    const [isOpenResult, setIsOpenResult] = useState(false);

    return(
        <>
            <section className={styles.state_wrap}>
                <div style={{backgroundColor: post.state === '투표중'? "#ac2323" : "gray"}}>{post.state}</div>
            </section>
            <section className={styles.title_wrap}>
                <p>[{post.category}] {post.title}</p>
                <div>{post.deadline} 종료</div>
                <div>단일 선택 • <span style={{color: "#ac2323"}}>{post.votes}</span> 명 참여</div>
            </section>
            <section className={styles.vote_wrap}>
                <table className={styles.vote_table}>
                    <tbody>
                    {Object.values(post.option).map((option, idx)=>    
                        <tr key={idx}>
                            {isOpenResult || post.state==="투표종료" || post.voted ?
                                <td style={{border: "1px solid gray"}}>
                                    <div className={styles.result_wrap} style={{width: `${option.percent}%`}}>
                                        {option.img !== '' && 
                                        <div className={styles.option_img}>
                                            <img src={option.img} alt="옵션" />
                                        </div>
                                        } 
                                    </div>
                                    <p className={option.img? `${styles.text}`: `${styles.text2}`}>
                                        {option.text}
                                    </p>
                                    <span className={styles.percent}>{option.percent}%</span>
                                </td>
                            :   <td>
                                    <div className={styles.option_wrap} >
                                        {option.img !== '' && 
                                        <div className={styles.option_img}>
                                            <img src={option.img} alt="옵션" /> 
                                        </div>} 
                                        <p>{option.text}</p>
                                    </div>
                                </td>
                            }
                        </tr> 
                    )}
                    </tbody>
                    <tfoot>
                        <tr>
                            {post.state === "투표종료" ?
                                <td><div>이미 종료된 투표입니다.</div></td>
                            : post.voted?
                                <td><div>이미 완료한 투표입니다.</div></td> 
                            : !isOpenResult ?
                                <td>
                                    <button className={styles.quick_vote}>빠른 투표</button>
                                    <button className={styles.result_vote} onClick={()=>setIsOpenResult(true)}>결과 보기</button>
                                </td>
                            :   <td><button className={styles.go_vote} onClick={()=>setIsOpenResult(false)}>투표하러가기</button></td>
                            }       
                        </tr>
                    </tfoot>
                </table>
            </section>
            <section className={styles.content_wrap}>
                <p>{post.content}</p>
            </section>
            <section className={styles.postInfo_wrap}>
                <ul>
                    <li>{post.user}</li>
                    <li>{post.date}</li>
                    <li><div><IoHeartOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.like}</div></li>
                    <li><div><LiaCommentDotsSolid style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.comment}</div></li> 
                    <li><div><IoEyeOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.view}</div></li>
                </ul>
            </section>
        </>
    );
}

export default PostCard;