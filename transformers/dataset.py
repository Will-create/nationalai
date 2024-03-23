import torch
import torch.nn as nn
from torch.utils.data import Dataset


def causal_mask(size):
    mask = torch.triu(torch.ones(1, size, size), diagonal=1).type(torch.int)
    return mask == 0

class BilingualDataset(Dataset):

    def __init__(self, ds, tokenizer_src, tokenizer_tgt, src_lang, tgt_lang, seq_len) -> None:
        super().__init__()

        self.ds = ds
        self.tokenizer_src = tokenizer_src
        self.tokenizer_tgt = tokenizer_tgt
        self.src_lang = src_lang
        self.tgt_lang = tgt_lang
        self.seq_len = seq_len
 
        sos_token_id = tokenizer_src.token_to_id('[SOS]')
        eos_token_id = tokenizer_src.token_to_id('[EOS]')
        pad_token_id = tokenizer_src.token_to_id('[PAD]')

        if sos_token_id is None:
            raise ValueError("[SOS] token not found in the vocabulary.")
        if eos_token_id is None:
            raise ValueError("[EOS] token not found in the vocabulary.")
        if pad_token_id is None:
            raise ValueError("[PAD] token not found in the vocabulary.")
        
        self.sos_token = torch.tensor([sos_token_id], dtype=torch.int64) 
        self.eos_token = torch.tensor([eos_token_id], dtype=torch.int64) 
        self.pad_token = torch.tensor([pad_token_id], dtype=torch.int64) 
    
    def __len__(self):
        return len(self.ds)
    

    def __getitem__(self, index):
        src_target_pair = self.ds[index]
        src_text = src_target_pair['name']
        tgt_text = src_target_pair['value']

        enc_input_tokens = self.tokenizer_src.encode(src_text).ids
        dec_input_tokens = self.tokenizer_tgt.encode(tgt_text).ids

        enc_num_padding_tokens =  self.seq_len - len(enc_input_tokens) - 2
        dec_num_padding_tokens = self.seq_len - len(dec_input_tokens) - 1

        if enc_num_padding_tokens < 0 or dec_num_padding_tokens < 0:
            raise ValueError('Sentence is too long')
    
        # Add SOS and EOS to the source text
        encoder_input = torch.cat(
            [
                self.sos_token,
                torch.tensor(enc_input_tokens, dtype=torch.int64),
                self.eos_token,
                torch.tensor([self.pad_token] * enc_num_padding_tokens, dtype=torch.int64)
            ],
            dim=0
        )

        # Add SOS to the decoder input
        decoder_input = torch.cat(
            [
                self.sos_token,
                torch.tensor(dec_input_tokens, dtype=torch.int64),
                torch.tensor([self.pad_token] * dec_num_padding_tokens, dtype=torch.int64)
            ],
            dim=0
        )

        # Add EOS to the label (What we expect as output from the decoder)
        label = torch.cat(
            [
                torch.tensor(dec_input_tokens, dtype=torch.int64),
                self.eos_token,
                torch.tensor([self.pad_token] * dec_num_padding_tokens, dtype=torch.int64)
            ],
            dim=0
        )

        assert encoder_input.size(0) == self.seq_len
        assert decoder_input.size(0) == self.seq_len
        assert label.size(0) == self.seq_len

        return {
            "encoder_input": encoder_input, # (Seq_Len)
            "decoder_input": decoder_input, # (Seq_Len)
            "encoder_mask": (encoder_input != self.pad_token).unsqueeze(0).unsqueeze(0).int(), # (1, 1, Seq_Len)
            "decoder_mask": (decoder_input != self.pad_token).unsqueeze(0).unsqueeze(0).int() & causal_mask(decoder_input.size(0)), # (1, Seq_Len) & (1, Seq_Len, Seq_Len)
            "label": label,
            "src_text": src_text,
            "tgt_text": tgt_text
        }
    




    

