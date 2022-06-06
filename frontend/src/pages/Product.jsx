import { Add, Remove } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct, updateProductQuantity } from "../redux/cartRedux";
import {useDispatch, useSelector} from "react-redux";
import {Container,ButtonQuantity, Amount, Button, Wrapper,
        ImageContainer, AmountContainer, AddContainer, FilterSizeOption, FilterSize,
        FilterColor, FilterTitle, Filter, FilterContainer, Price, Description, Title,
        Image, InfoContainer} from "../styledComponents/Product";


function Product(props) {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const cartProducts = useSelector((state) => state.cart.products);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("products/" + id);
                setProduct(res.data);
                setColor(res.data.color[0]);
                setSize(res.data.sizes[0]);
            } catch {}
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec" && quantity > 1) {
            setQuantity(quantity - 1);
        }
        if (type === "inc") {
            setQuantity(quantity + 1);
        }
    }

   const handleClick = () => {
        let index = cartProducts.findIndex((item) => item._id === product._id && item.color === color && item.size === size);
        if (index !== -1) {
            dispatch(updateProductQuantity({index: index, price: product.price, quantity: quantity}));
        }
        else {
            dispatch(addProduct({ ...product, quantity, color, size }));
        }

    };

    return (
        <Container>
            <Wrapper>
                <ImageContainer>
                    <Image src={product.image} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>
                        {product.description}
                    </Description>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor name="color" selected={color === c} color={c} key={c} onClick={() => setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                {product.sizes?.map((s) => (
                                    <FilterSizeOption name="size" key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                            <AmountContainer>
                                <Remove onClick={() => handleQuantity("dec")} />
                                <Amount>{quantity}</Amount>
                                <Add onClick={() => handleQuantity("inc")} />
                            </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
        </Container>
    );
}

export default Product;